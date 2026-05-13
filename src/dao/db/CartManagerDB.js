import Cart from "../../models/cart.model.js";

export default class CartManagerDB {
  async createCart() {
    return await Cart.create({ products: [] });
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product").lean();
  }

  async addProductToCart(cid, pid) {
    const cart = await Cart.findById(cid);
    const index = cart.products.findIndex((p) => p.product.toString() === pid);
    if (index >= 0) {
      cart.products[index].quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    return await cart.save();
  }

  async removeProductFromCart(cid, pid) {
    return await Cart.findByIdAndUpdate(
      cid,
      { $pull: { products: { product: pid } } },
      { new: true },
    );
  }

  async updateCart(cid, products) {
    return await Cart.findByIdAndUpdate(cid, { products }, { new: true });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    const index = cart.products.findIndex((p) => p.product.toString() === pid);
    if (index >= 0) cart.products[index].quantity = quantity;
    return await cart.save();
  }

  async clearCart(cid) {
    return await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
  }
}
