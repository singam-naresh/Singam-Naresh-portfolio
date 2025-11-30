// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ----- ENV SETUP -----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the backend folder (works for PM2 + direct node)
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 4000;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

const app = express();
app.use(cors());
app.use(express.json());

// ----- MESSAGE STORAGE (file based) -----
const DATA_DIR = path.join(__dirname, "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

async function readMessages() {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeMessages(messages) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// ----- PUBLIC CONTACT ROUTE -----
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields required" });
  }

  try {
    // 1) Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    // 2) Save message to file for admin dashboard
    const messages = await readMessages();
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    await writeMessages(messages);

    res.json({ success: true });
  } catch (err) {
    console.log("Email error:", err);
    res.json({ success: false, error: err.message });
  }
});

// ----- ADMIN AUTH MIDDLEWARE -----
function requireAdmin(req, res, next) {
  if (!ADMIN_SECRET) {
    return res
      .status(500)
      .json({ success: false, error: "Admin not configured on server" });
  }

  const token = req.headers["x-admin-token"];
  if (!token || token !== ADMIN_SECRET) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  next();
}

// ----- ADMIN LOGIN ROUTE -----
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (!ADMIN_SECRET) {
    return res
      .status(500)
      .json({ success: false, error: "Admin not configured" });
  }

  if (password === ADMIN_SECRET) {
    // For simplicity we just echo back the same secret as token
    return res.json({ success: true, token: ADMIN_SECRET });
  }

  return res
    .status(401)
    .json({ success: false, error: "Invalid admin password" });
});

// ----- ADMIN MESSAGES ROUTE -----
app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  try {
    const messages = await readMessages();
    // latest first
    res.json({ success: true, messages: messages.reverse() });
  } catch (err) {
    console.error("Read messages error:", err);
    res.status(500).json({ success: false, error: "Failed to load messages" });
  }
});

// (optional) delete one message in future
// app.delete("/api/admin/messages/:id", requireAdmin, async (req, res) => { ... });

app.listen(PORT, () =>
  console.log("🚀 Backend running on port " + PORT)
);
