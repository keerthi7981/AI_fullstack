# AI Sustainability Tracker

This is a full-stack web application that helps users receive AI-generated suggestions for making cloud-based software systems more sustainable. The tool is powered by the Groq LLM (LLaMA3-8B-8192) and is integrated using LangChain.

## Project Summary

- **Frontend**: Built using React and TypeScript for submitting queries and viewing AI responses.
- **Backend**: Node.js with Express and TypeScript, integrating Groq LLM via LangChain.
- **LLM**: Groq API (LLaMA3-8B-8192) used for generating sustainability suggestions.
- **Optional Features**:
  - SQLite database for storing queries and responses.
---

## Thought Process

I chose a **Sustainability Advisor** as my LLM-integrated application idea because sustainable design is becoming increasingly vital in software development. The app empowers developers or architects to make greener decisions with the help of AI suggestions.

- The Groq model was selected due to availability and speed.
- SQLite was considered to log interactions for future auditing.

---

##  Features

- suggest improvements in cloud infrastructure for sustainability
- LLM integration using LangChain
- Clean UI to input queries and see AI responses
- Modular backend setup
- Environment variable support with `.env`
- SQLite integration

---

## Tech Stack

- React + TypeScript (Frontend)
- Express.js + TypeScript (Backend)
- LangChain
- Groq API (LLaMA3-8B)
- SQLite 

##  Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/keerthi7981/AI_fullstack.git
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend` and add:

```
GROQ_API_KEY=your-groq-api-key-here
```

Run the backend:

```bash
npm run dev
```

It will be available at `http://localhost:3001`.

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`.

Submit a query, and it will call the backend and fetch LLM results.

---

### 4️⃣ SQLite Setup

In `backend/database.ts`, SQLite is set up to create a local DB file (`sustainability.db`) and log queries.

To test:

- Ensure SQLite is installed.
- Send a query.
- `sustainability.db` is created and stores records


