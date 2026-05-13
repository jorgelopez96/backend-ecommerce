import Product from "../../models/product.model.js";

export default class ProductManagerDB {
  async getProducts({ limit = 10, page = 1, query = "", sort = "" }) {
    const filter = query ? { category: query } : {};
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort:
        sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
    };
    const result = await Product.find(filter)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit)
      .lean();
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / options.limit);
    return {
      docs: result,
      totalPages,
      page: options.page,
      hasPrevPage: options.page > 1,
      hasNextPage: options.page < totalPages,
      prevPage: options.page > 1 ? options.page - 1 : null,
      nextPage: options.page < totalPages ? options.page + 1 : null,
    };
  }

  async getProductById(id) {
    return await Product.findById(id).lean();
  }

  async addProduct(data) {
    return await Product.create(data);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
