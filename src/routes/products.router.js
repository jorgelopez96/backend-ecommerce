import { Router } from "express";
import ProductManagerDB from "../dao/db/ProductManagerDB.js";

const router = Router();
const manager = new ProductManagerDB();

const emitProducts = async (io) => {
  const result = await manager.getProducts({});
  io.emit("updateProducts", result.docs);
};

router.get("/", async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const result = await manager.getProducts({ limit, page, query, sort });
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await manager.getProductById(req.params.pid);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await manager.addProduct(req.body);
    const io = req.app.get("io");
    if (io) await emitProducts(io);
    res.status(201).json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const product = await manager.updateProduct(req.params.pid, req.body);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    res.json({ status: "success", payload: product });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    await manager.deleteProduct(req.params.pid);
    const io = req.app.get("io");
    if (io) await emitProducts(io);
    res.json({ status: "success", message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
