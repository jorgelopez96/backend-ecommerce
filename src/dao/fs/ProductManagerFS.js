import fs from "fs";

export default class ProductManagerFS {
  constructor() {
    this.path = "./src/dao/fs/products.json";
    if (!fs.existsSync(this.path)) fs.writeFileSync(this.path, "[]");
  }

  async getProducts() {
    const data = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  }

  async addProduct(data) {
    const products = await this.getProducts();
    const newProduct = { id: Date.now(), ...data };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, data) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data };
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter((p) => p.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(filtered, null, 2));
  }
}
