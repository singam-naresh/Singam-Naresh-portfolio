Naresh Portfolio Backend (Node.js + Express + Nodemailer)

This is the backend for my portfolio website.
Its main function is to handle email sending from the contact form using Google App Passwords.

🚀 Features
⭐ Contact Form API

Secure endpoint to receive contact queries from users.

⭐ Google App Password Email System

Uses Nodemailer + Gmail App Password for 100% reliable delivery.

⭐ CORS + JSON Body Parsing

Configured to accept requests from React frontend.

⭐ Environment Variables

Sensitive data is stored in .env file.

📂 Project Structure
backend/
 ├── server.js
 ├── package.json
 ├── .env
 └── README.md

🔧 Installation
1️⃣ Install packages
npm install

🔐 Environment Variables

Create a file:

📁 backend/.env

Add:

PORT=4000

EMAIL_USER=inareshofficial@gmail.com
EMAIL_PASS=your-google-app-password

▶️ Running the server
node server.js


If success:

🚀 Backend running on port 4000

📡 API Endpoint
POST /api/contact

Send JSON:

{
  "name": "Test User",
  "email": "test@gmail.com",
  "message": "Hello Naresh!"
}


Response:

{
  "success": true,
  "message": "Email sent successfully!"
}

🧑‍💻 Used Libraries

Express

Nodemailer

CORS

dotenv

❗ Note

Works only when you set:

Google 2-Step Verification

Google App Password

🧑‍💻 Author

Naresh Singam
Backend • Java • AI Hiring
Bengaluru
Email: inareshofficial@gmail.com

📦 DONE — BACKEND README FINISHED
📌 WHERE TO PLACE FILES?

👇 Your folder structure should look like this:

naresh-portfolio/
 ├── frontend/
 │   ├── README.md   ← place frontend readme here
 │   └── (all front files)
 ├── backend/
 │   ├── README.md   ← place backend readme here
 │   └── (all backend files)
 └── (root)
