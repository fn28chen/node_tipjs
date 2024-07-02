"use strict";

const { product, clothing, electronic } = require("../models/product.model");
const { BadRequestError, ForbiddenError } = require("../core/error.response");

// define Factory class to create product (Service Product)
class ProductFactory {
  /*
        type: "Clothing",
        payload
    */
  static async createProduct(type, payload) {
    switch (type) {
      case "Electronics":
        return new Electronics(payload).createProduct();
      case "Clothing":
        return new Clothing(payload).createProduct();
      default:
        throw new BadRequestError(`Invalid product type ${type}`);
    }
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
    return await product.create({...this, _id: product_id});
  }
}

// define sub-class for different product types (Concrete Product)
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
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
    const newElectronics = await electronic.create({
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

module.exports = {
  ProductFactory,
  Clothing,
  Electronics,
};
