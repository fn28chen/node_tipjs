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
  searchProductsByUser,
  findAllProducts,
  findProducts,
  updateProductById,
} = require("../models/repositories/product.repo");

// define Factory class to create product (Service Product)
class ProductFactory {
  static productRegistry = {}; // store all product types

  static registerProductType(type, productClass) {
    ProductFactory.productRegistry[type] = productClass;
  }

  static async createProduct(type, payload) {
    console.log(type);
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid product type ${type}`);
    }
    return new productClass(payload).createProduct();
  }

  static async updateProduct(type, product_id, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass)
      throw new BadRequestError(`Invalid product type ${type}`);
    return new productClass(payload).updateProduct(product_id);
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id });
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true, isPublished: false };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: false, isPublished: true };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
  }) {
    return await findAllProducts({
      limit,
      sort,
      page,
      filter,
      select: ["product_name", "product_price", "product_thumb"],
    });
  }

  static async findProducts({ product_id }) {
    return await findProducts({
      product_id,
      unSelect: ["__v", "product_variations"],
    });
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

  // update product
  async updateProduct(product_id, bodyUpdate) {
    return await updateProductById({
      product_id,
      bodyUpdate,
      model: product,
    });
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

  async updateProduct(product_id) {
    // remove attr has null undefined
    console.log("Product ID in Update Product in Clothing class:", product_id);
    const objectParams = this;
    // check update
    if (objectParams.product_attributes) {
      await updateProductById({
        product_id,
        objectParams,
        model: clothes,
        isNew: true,
      });
    }

    const updateProduct = await super.updateProduct(product_id, objectParams);
    return updateProduct;
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
  
  async updateProduct(product_id) {
    // remove attr has null undefined
    console.log("Product ID in Update Product in Clothing class:", product_id);
    const objectParams = this;
    // check update
    if (objectParams.product_attributes) {
      await updateProductById({
        product_id,
        objectParams,
        model: electronics,
        isNew: true,
      });
    }

    const updateProduct = await super.updateProduct(product_id, objectParams);
    return updateProduct;
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
  
  async updateProduct(product_id) {
    // remove attr has null undefined
    console.log("Product ID in Update Product in Clothing class:", product_id);
    const objectParams = this;
    // check update
    if (objectParams.product_attributes) {
      await updateProductById({
        product_id,
        objectParams,
        model: furnitures,
        isNew: true,
      });
    }

    const updateProduct = await super.updateProduct(product_id, objectParams);
    return updateProduct;
  }
}

// register product types
ProductFactory.registerProductType("Clothing", Clothing);
ProductFactory.registerProductType("Electronics", Electronics);
ProductFactory.registerProductType("Furnitures", Furnitures);

module.exports = ProductFactory;
