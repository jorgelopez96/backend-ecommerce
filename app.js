import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

// Conexión MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Ruta raiz
app.get("/", (req, res) => {
  res.redirect("/products");
});

// Rutas vistas
app.get("/products", async (req, res) => {
  try {
    const manager = (await import("./src/dao/db/ProductManagerDB.js")).default;
    const m = new manager();
    const { limit, page, query, sort } = req.query;
    const result = await m.getProducts({ limit, page, query, sort });
    res.render("products", {
      title: "Productos",
      products: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const manager = (await import("./src/dao/db/ProductManagerDB.js")).default;
    const m = new manager();
    const product = await m.getProductById(req.params.pid);
    res.render("productDetail", { title: product.title, product });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/carts/:cid", async (req, res) => {
  try {
    const manager = (await import("./src/dao/db/CartManagerDB.js")).default;
    const m = new manager();
    const cart = await m.getCartById(req.params.cid);
    res.render("cart", { title: "Carrito", products: cart.products });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export { app as default };
