"use strict";

const {
  product,
  clothes,
  electronics,
  furnitures,
} = require("../models/product.model");
const { BadRequestError, ForbiddenError } = require("../core/error.response");
const {
  findAllDraftsForShop,
  publishProductByShop,
  findAllPublishedForShop,
  unPublishProductByShop,
} = require("../models/repositories/product.repo");

// define Factory class to create product (Service Product)
class ProductFactory {
  static productRegistry = {}; // store all product types

  static registerProductType(type, productClass) {
    ProductFactory.productRegistry[type] = productClass;
  }

  static async createProduct() {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid product type ${type}`);
    }
    return new productClass(payload).createProduct();
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id });
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async searchProductsByUser({ keySearch }) {
    return await searchProductsByUser({ keySearch });
  }
}

// define Product class (Abstract Product)
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_type,
    product_shop,
    product_attributes,
    product_quantity,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
    this.product_quantity = product_quantity;
  }

  // create new product
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

// define sub-class for different product types (Concrete Product)
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothes.create(this.product_attributes);
    if (!newClothing) {
      throw new BadRequestError("Failed to create new Clothing product");
    }
    const newProduct = await super.createProduct();
    if (!newProduct) {
      throw new BadRequestError("Failed to create new product");
    }
    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronics = await electronics.create({
      ...this.product_attributes,
      proudct_shop: this.product_shop,
    });
    if (!newElectronics) {
      throw new BadRequestError("Failed to create new Electronics product");
    }
    const newProduct = await super.createProduct(newElectronics._id);
    if (!newProduct) {
      throw new BadRequestError("Failed to create new product");
    }
    return newProduct;
  }
}

class Furnitures extends Product {
  async createProduct() {
    const newFurniture = await furnitures.create({
      ...this.product_attributes,
      proudct_shop: this.product_shop,
    });
    if (!newFurniture) {
      throw new BadRequestError("Failed to create new Furnitures product");
    }
    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) {
      throw new BadRequestError("Failed to create new product");
    }
    return newProduct;
  }
}

// register product types
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Electronics", Electronics);
ProductFactory.registerProductType("Furnitures", Furnitures);

module.exports = {
  ProductFactory,
  Clothing,
  Electronics,
  Furnitures,
};
