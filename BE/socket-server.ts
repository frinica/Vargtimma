require("dotenv").config();
import { Server } from "socket.io";
import express from "express";

const app = express();
/* const server = createServer(app); */
const http = require("http").createServer(app);
const { addUser, removeUser } = require("./socket/user");

const options = process.env.REQUEST_URL;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const PORT = Number(process.env.SOCKET_PORT) || 5000;

io.on("connection", (socket: any) => {
  socket.once(
    "join",
    ({ username, room }: { username: string; room: string }, callBack: any) => {
      const { user, error } = addUser({ id: socket.id, username, room });
      if (error) {
        console.log(error);
      } else {
        socket.join(user.room, (error: any) => {
          if (error) {
            console.log("Error when joining: ", error);
            return;
          }
        });
      }

      callBack(null);

      socket.on("sendMessage", ({ message }: { message: any }) => {
        console.log(message);
        io.to(user.room).emit("message", {
          user: user.username,
          text: message,
        });
      });
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

http.listen(PORT, () => console.log(`Socket-server is running on ${PORT}`));
