import { Router } from "express";
import CartManagerDB from "../dao/db/CartManagerDB.js";

const router = Router();
const manager = new CartManagerDB();

router.post("/", async (req, res) => {
  try {
    const cart = await manager.createCart();
    res.status(201).json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await manager.addProductToCart(req.params.cid, req.params.pid);
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await manager.removeProductFromCart(
      req.params.cid,
      req.params.pid,
    );
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const cart = await manager.updateCart(req.params.cid, req.body.products);
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cart = await manager.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      req.body.quantity,
    );
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cart = await manager.clearCart(req.params.cid);
    res.json({ status: "success", payload: cart });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
