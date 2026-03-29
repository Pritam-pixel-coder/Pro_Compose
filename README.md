# Pro_Compose - AI Email Generator

Pro_Compose is a modern, professional AI-powered email generator. Built with a React frontend and a Node.js/Express backend, it utilizes Google's Gemini 2.5 Flash Lite model to quickly draft high-converting, professional emails based on your specific requirements like tone, formality, and key talking points.

## 🌟 Features

- **AI-Powered Generation**: Instantly draft emails using Google Gemini 2.5 Flash Lite.
- **Customizable Tones**: Choose between Professional, Friendly, Urgent, or Persuasive tones.
- **Adjustable Formality**: Fine-tune the formality of your email using a 1-10 slider.
- **Must-Include Details**: Easily add specific bullet points out you want the AI to incorporate into the email body.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a sleek, responsive, and animated user interface.
- **One-Click Copy**: Copy your generated drafts to the clipboard instantly.
- **Database Ready**: Integrated with Prisma ORM and PostgreSQL for template and prompt history tracking (extendable).

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript and Vite
- **Styling**: Tailwind CSS & PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: Node.js & Express.js
- **AI Integration**: `@google/generative-ai` (Gemini API)
- **Database/ORM**: Prisma with PostgreSQL (`@prisma/adapter-pg`, `pg`)
- **Other utilities**: `cors`, `dotenv`

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL database
- Google Gemini API Key

## 🛠️ Installation & Setup

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   git clone https://github.com/Pritam-pixel-coder/Pro_Compose.git
   cd Pro_Compose
   ```

2. **Install Backend Dependencies**:
   ```bash
   npm install
   # or
   cd backend && npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables Configuration**:
   Create a `.env` file in the `backend` directory (or use `.env.example` as a reference) and add the following:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_google_gemini_api_key
   DATABASE_URL=your_postgresql_database_url
   ```

5. **Database Migration** (Prisma):
   Inside the `backend` directory, run:
   ```bash
   npx prisma migrate dev
   # or simply push the schema
   npx prisma db push
   ```

## 🏃‍♂️ Running the Application

### 1. Start the Backend Server
Navigate to the `backend` directory (if not already there) and start the Node server:
```bash
npm start
```
The backend server will normally start on `http://localhost:3000`.

### 2. Start the Frontend Development Server
Open a new terminal, navigate to the `frontend` directory, and run:
```bash
npm run dev
```
The Vite development server will start, typically accessible at `http://localhost:5173`.

## 📂 Project Structure

```
├── backend/
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/
│   │   ├── config/         # Database and app configurations
│   │   ├── routes/         # Express API routes (generateEmail, templates, etc.)
│   │   ├── services/       # Core business logic
│   │   ├── templates/      # JSON/Static templates
│   │   ├── utils/          # Helper modules (geminiClient.js, buildPrompt.js)
│   │   └── server.js       # Express server entry point
│   └── .env                # Backend environment variables
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Main React application component
│   │   ├── index.css       # Global layout / Tailwind styling
│   │   └── main.tsx        # React DOM render entry
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── package.json            # Root configuration (optional scripts)
```