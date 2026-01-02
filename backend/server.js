// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ===============================
   ENV + PATH SETUP
================================ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend/.env (works on local + Render)
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 4000;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

/* ===============================
   APP INIT
================================ */
const app = express();

/* ===============================
   ✅ CORS FIX (VERY IMPORTANT)
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://singam-naresh-portfolio.vercel.app",
  "https://singam-naresh-portfolio.onrender.com",
  // allow all preview deployments
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / curl / Postman
      if (!origin) return callback(null, true);

      // allow all vercel preview URLs
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Token"],
    credentials: true,
  })
);

// IMPORTANT: handle preflight
app.options("*", cors());

app.use(express.json());

/* ===============================
   MESSAGE STORAGE (FILE BASED)
================================ */
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

/* ===============================
   PUBLIC CONTACT API
================================ */
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields required",
    });
  }

  try {
    // ---- EMAIL ----
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    // ---- SAVE MESSAGE ----
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

    return res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
});

/* ===============================
   ADMIN AUTH MIDDLEWARE
================================ */
function requireAdmin(req, res, next) {
  if (!ADMIN_SECRET) {
    return res.status(500).json({
      success: false,
      error: "Admin not configured on server",
    });
  }

  const token = req.headers["x-admin-token"];
  if (!token || token !== ADMIN_SECRET) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }

  next();
}

/* ===============================
   ADMIN LOGIN
================================ */
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (!ADMIN_SECRET) {
    return res.status(500).json({
      success: false,
      error: "Admin not configured",
    });
  }

  if (password === ADMIN_SECRET) {
    return res.json({
      success: true,
      token: ADMIN_SECRET,
    });
  }

  return res.status(401).json({
    success: false,
    error: "Invalid admin password",
  });
});

/* ===============================
   ADMIN MESSAGES
================================ */
app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  try {
    const messages = await readMessages();
    res.json({
      success: true,
      messages: messages.reverse(),
    });
  } catch (err) {
    console.error("Read messages error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to load messages",
    });
  }
});

/* ===============================
   HEALTH CHECK (OPTIONAL)
================================ */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ===============================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log("🚀 Backend running on port " + PORT);
});
