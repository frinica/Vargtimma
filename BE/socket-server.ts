import { Server } from "socket.io";
import express from "express";
import http from "http";

interface ServerToClientEvents {
  // Broadcasting events
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  join: (username: any, room: any) => void;
}

interface ClientToServerEvents {
  // Receiving events
  hello: () => void;
}

interface InterServerEvents {
  // Inter-server communication
  ping: () => void;
}

interface SocketData {
  // Type socket.data attribute
  name: string;
  age: number;
}

const app = express();
const server = http.createServer(app);
const { addUser } = require("./socket/user");

const io = new Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORT = process.env.SOCKET_PORT || 5000;

server.listen(PORT, () =>
  console.log(`Socket-server is running on http://localhost:${PORT}`)
);

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    const { user, error } = addUser({ id: socket.id, username, room });

    socket.join(user.room);
  });

  socket.on("disconnect", () => {
    console.log("A disconnection has been made");
  });
});
