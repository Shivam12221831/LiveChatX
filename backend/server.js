const express = require('express');
const app = express();
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectToDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const ExpressError = require('./middlewares/ExpressError'); 
const notFound = require('./middlewares/notFound');
const path = require('path');
const history = require("connect-history-api-fallback");

dotenv.config();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(history());


// app.use((req, res, next) => {
//   console.log(`Incoming: ${req.method} ${req.originalUrl}`);
//   next();
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// --------------- Deployed ---------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
    app.use(express.static(path.join(__dirname, "frontend", "build", "index.html")));
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// ---------------- Deployed ---------------

app.use(notFound);

// Custom error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
  });
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: true,
    // methods: ["GET", "POST", "OPTIONS"], // optional but safe
    credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});