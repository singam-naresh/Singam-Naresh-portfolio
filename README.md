# Naresh Singam Portfolio

A full-stack portfolio application built with React (Frontend) and Node.js/Express (Backend).

## Project Structure

```
naresh-portfolio/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── .gitignore         # Root gitignore
├── package.json       # Root package.json for monorepo
└── README.md          # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd naresh-portfolio
```

### 2. Install Dependencies

#### Option A: Install all at once (recommended)
```bash
npm run install:all
```

#### Option B: Install manually
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Configuration

#### Frontend Environment
```bash
cd frontend
cp .env.example .env
```
Edit `frontend/.env` with your values:
```
VITE_BACKEND_URL=http://localhost:4000
VITE_ADMIN_KEY=your_admin_key_here
```

#### Backend Environment
```bash
cd backend
cp .env.example .env
```
Edit `backend/.env` with your values:
```
PORT=4000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
ADMIN_SECRET=your_admin_secret_here
```

### 4. Running the Application

#### Development Mode

**Start Backend (Terminal 1):**
```bash
npm run dev:backend
# or
cd backend && npm start
```

**Start Frontend (Terminal 2):**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

#### Production Build

**Build Frontend:**
```bash
npm run build:frontend
# or
cd frontend && npm run build
```

## Available Scripts

### Root Level
- `npm run install:all` - Install dependencies for all packages
- `npm run dev:frontend` - Start frontend development server
- `npm run dev:backend` - Start backend server
- `npm run build:frontend` - Build frontend for production
- `npm run clean` - Remove all node_modules (Unix/Mac)
- `npm run clean:win` - Remove all node_modules (Windows)

### Frontend (`cd frontend`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend (`cd backend`)
- `npm start` - Start the server

## Environment Variables

### Frontend (.env)
- `VITE_BACKEND_URL` - Backend API URL
- `VITE_ADMIN_KEY` - Admin authentication key

### Backend (.env)
- `PORT` - Server port (default: 4000)
- `EMAIL_USER` - Email for contact form
- `EMAIL_PASS` - Email app password
- `ADMIN_SECRET` - Admin authentication secret

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Render/Railway/Heroku)
1. Deploy the `backend` folder
2. Set environment variables in your hosting platform
3. Ensure the start script is configured: `node server.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details