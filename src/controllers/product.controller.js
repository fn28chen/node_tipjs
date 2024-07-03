"use strict";

const ProductService = require("../services/product.service.strei");
const { OK, CREATED } = require("../core/success.response");
const { refreshToken } = require("./access.controller");

class ProductController {
  createProduct = async (req, res, next) => {
    new CREATED({
      message: "Product created successfully",
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  publishProduct = async (req, res, next) => {
    new CREATED({
      message: "Product published successfully",
      metadata: await ProductService.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  unPublishProduct = async (req, res, next) => {
    new OK({
      message: "Product published successfully",
      metadata: await ProductService.unPublishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  // Query
  /**
   * @description Get all drafts for a shop
   * @param {Number} limit
   * @param {Number} skip
   * @return { JSON }
   */
  getAllDraftsForShop = async (req, res, next) => {
    new OK({
      message: "Drafts fetched successfully",
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId,
        limit: req.query.limit,
        skip: req.query.skip,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new OK({
      message: "Published products fetched successfully",
      metadata: await ProductService.findAllPublishedForShop({
        product_shop: req.user.userId,
        limit: req.query.limit,
        skip: req.query.skip,
      }),
    }).send(res);
  };

  searchProductsByUser = async (req, res, next) => {
    new OK({
      message: "Products fetched successfully",
      metadata: await ProductService.searchProductsByUser(req.params),
    }).send(res);
  };

  findAllProducts = async(req, res, next) => {
    new OK({
      message: "Get list findAllProducts successfully",
      metadata: await ProductService.findAllProducts(req.query),
    }).send(res);
  }

  findProducts = async(req, res, next) => {
    new OK({
      message: "Get list findProducts successfully",
      metadata: await ProductService.findProducts({
        product_id: req.params.product_id,
      }), 
    }).send(res);
  }
}

module.exports = new ProductController();
