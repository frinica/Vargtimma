require("dotenv").config();
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

/* interface ServerToClientEvents {
  // Broadcasting events
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  join: (username: any, room: any) => void;
  sendMessage: (message: any) => void;
}

interface ClientToServerEvents {
  // Receiving events
  message: (message: any) => void;
}

interface InterServerEvents {
  // Inter-server communication
  ping: () => void;
}

interface SocketData {
  // Type socket.data attribute
  name: string;
  age: number;
} */

const app = express();
/* const server = createServer(app); */
const http = require("http").createServer(app);
const { addUser, removeUser } = require("./socket/user");

const options = process.env.REQUEST_URL;
const customPath = process.env.CUSTOM_PATH;
/* const io = new Server(server, {
  cors: {
    origin: options,
  },
}); */
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
      /* socket.emit("message", {
        user: "Admin",
        text: "Välkommen till chatten.",
      }); */
      /* io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.username} has joined!`,
      }); */
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
