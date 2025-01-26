import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export const getSocketIO = () => io;
