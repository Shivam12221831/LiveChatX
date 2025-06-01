# 💬 LiveChatX

Deploy Link : https://livechatx.onrender.com/

A **real-time chat application** built with the **MERN Stack + Socket.IO**, offering seamless 1-on-1 and group messaging, typing indicators, user authentication, and an elegant UI.
---

## 🚀 Features

- 🔐 **JWT Authentication** – Secure login & registration
- 💬 **Real-Time Messaging** – Powered by Socket.IO
- 🧑‍🤝‍🧑 **1-on-1 & Group Chats**
- ✍️ **Typing Indicators**
- 🟢 **Online Status Indicator**
- 🔍 **User Search**
- 📦 **MongoDB** for persistent storage
- 🎨 **Modern UI** with React & Material UI
- ⚙️ **RESTful APIs** with Express.js

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Axios  
- Material UI  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.IO  
- JWT + Bcrypt for Auth  

**Deployment:**  
- LiveChatX: Render
- Database: MongoDB Atlas  

---

## 🧩 Folder Structure

LiveChatX/
├── frontend/ # React frontend

│ └── src/

│ └── components/

│ └── context/

│ └── pages/

│ └── App.js

├── backend/ # Express backend

│ ├── config/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── socket.js

│ └── server.js

├── .env

└── README.md

---

## 📦 Getting Started Locally

- **Clone the repo**
   ```bash
   git clone https://github.com/Shivam12221831/LiveChatX.git
Setup Environment Variables
Create a .env in /server folders.

## Install dependencies
bash
cd frontend && npm install
Main folder(LiveChatX) -> npm install
Run the app

bash
node /backend/server.js
cd frontend && npm start


## 🔐 Environment Variables

Main Folder(LiveChatX) -> .env

PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_jwt_secret


## 🧠 Learning Highlights

Mastered WebSocket (Socket.IO) for bidirectional real-time communication

Implemented secure JWT-based authentication

Scalable REST API structure

React state management using Context API

Live typing indicator via socket events


## 🙋‍♂️ Author

Shivam Singh

🧑‍💻 Full Stack Developer | B.Tech CSE

📫 Connect on LinkedIn - www.linkedin.com/in/shivam-singh-s05

🌐 Portfolio - https://portfolio-shivam12221831s-projects.vercel.app/


## 

⭐️ Give it a Star
If you like the project, don’t forget to ⭐️ this repo!
