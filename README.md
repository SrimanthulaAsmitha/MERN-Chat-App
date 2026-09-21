# 💬 MERN Chat App

A real-time chat application built using the **MERN Stack** that allows users to communicate through a simple and interactive chat interface.

## 🚀 Features

* 🔐 User Login & Authentication
* 💬 Real-time chatting
* 🟢 Online user status
* ✍️ Typing indicator
* 👤 User profile and avatar
* 🕒 Message timestamps
* 💾 Local storage for user session
* 📱 Responsive chat interface
* 🌙 Incognito/private chat visibility
* 🗄️ MongoDB database integration

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* REST API

### Tools

* Git & GitHub
* MongoDB Compass
* VS Code

## 📂 Project Structure

```text
MERN-Chat-App/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── package.json
│
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/SrimanthulaAsmitha/MERN-Chat-App.git
```

### 2. Open the project

```bash
cd MERN-Chat-App
```

### 3. Install dependencies

For the client:

```bash
cd client
npm install
```

For the server:

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder and add your required MongoDB connection details and other environment variables.

**Do not upload your `.env` file to GitHub.**

### 5. Start the backend

```bash
cd server
npm start
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🗄️ Database

This project uses **MongoDB** to store application data.

Example local MongoDB connection:

```text
mongodb://127.0.0.1:27017/chatapp
```

## 🎯 Project Purpose

The purpose of this project is to understand how a full-stack web application works by connecting a React frontend with a Node.js/Express backend and MongoDB database.

It demonstrates frontend development, backend APIs, database integration, authentication, and real-time communication concepts.

## 🔮 Future Improvements

* Group chats
* Message notifications
* Image and file sharing
* Message search
* Message reactions
* Improved authentication
* Deployment with cloud services

## 👩‍💻 Author

**Srimanthula Asmitha**

## ⭐ GitHub Repository

[MERN-Chat-App Repository](https://github.com/SrimanthulaAsmitha/MERN-Chat-App?utm_source=chatgpt.com)
