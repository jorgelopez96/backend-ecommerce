import fs from "fs";

export default class CartManagerFS {
  constructor() {
    this.path = "./src/dao/fs/carts.json";
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, "[]");
  }

  async createCart() {
    const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const newCart = { id: Date.now(), products: [] };
    carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return carts.find((c) => c.id === id) || null;
  }

  async addProductToCart(cid, pid) {
    const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const cart = carts.find((c) => c.id === cid);
    if (!cart) return null;
    const index = cart.products.findIndex((p) => p.product === pid);
    if (index >= 0) {
      cart.products[index].quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }

  async clearCart(cid) {
    const carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const cart = carts.find((c) => c.id === cid);
    if (!cart) return null;
    cart.products = [];
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}
