import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);
const io = new Server(httpServer);
app.set("io", io);

io.on("connection", async (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Al conectarse, enviar lista actual de productos
  try {
    const { default: ProductManagerDB } =
      await import("./src/dao/db/ProductManagerDB.js");
    const manager = new ProductManagerDB();
    const result = await manager.getProducts({});
    socket.emit("updateProducts", result.docs);
  } catch (err) {
    console.error("Error emitiendo productos:", err.message);
  }

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { io };
