/* eslint-disable no-underscore-dangle */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const { PORT } = process.env;
const app = express();

// setting cors
app.use(
  cors({
    origin: ["http://localhost:3000","https://projectmanage.netlify.app"],
    method: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

require("./config/db");

// middlewar for cookie
app.use(cookieParser());

// built-in middleware for json
app.use(express.json());

app.use(fileUpload({ useTempFiles: true }));

app.use("/admin", require("./api/routes/admin"));
app.use("/developer", require("./api/routes/developer"));

const server = app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000, // connection will turn of within 6s if no communu.. to save bandwidth
  cors: ["http://localhost:3000","https://projectmanage.netlify.app"],
});
// setting socket
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  // for joining into a chat
  socket.on("join chat", (roomId) => {
    socket.join(roomId);
  });
  // for sending a message
  socket.on("new message", (newMessageRecieved) => {
    const { chat } = newMessageRecieved;
    if (!chat?.developers) return 
    chat.developers.forEach((developer) => {
      if (developer._id === newMessageRecieved.sender._id) return;
      socket.in(developer._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.off("setup", (userData) => {
    socket.leave(userData._id);
  });
});
