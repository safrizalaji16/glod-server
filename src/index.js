"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    let { Server } = require("socket.io");
    let io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected", socket.id);

      // Setelah 3 detik, kirimkan link video kepada klien
      setTimeout(() => {
        socket.emit("linkVideo", "ini link nya");
      }, 3000);

      // Setelah 5 detik, lakukan auto disconnect
      setTimeout(() => {
        socket.disconnect(true); // Parameter true berarti disconnect secara paksa
        console.log("Auto disconnecting user", socket.id);
      }, 5000);

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });

    strapi.io = io;
  },
};
