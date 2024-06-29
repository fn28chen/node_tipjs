"use strict";

const ProductService = require("../services/product.service");
const ProductServiceV2 = require("../services/product.service.strei");
const { OK, CREATED } = require("../core/success.response");
const { refreshToken } = require("./access.controller");

class ProductController {
  createProduct = async (req, res, next) => {
    new CREATED({
      message: "Product created successfully",
      metadata: await ProductServiceV2.createProduct(req.body.product_type, {
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
      metadata: await ProductServiceV2.publishProductByShop({
        product_shop: req.user.userId,
        product_id: req.params.id,
      }),
    }).send(res);
  };

  unPublishProduct = async (req, res, next) => {
    new OK({
      message: "Product published successfully",
      metadata: await ProductServiceV2.unPublishProductByShop({
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
      metadata: await ProductServiceV2.findAllDraftsForShop({
        product_shop: req.user.userId,
        limit: req.query.limit,
        skip: req.query.skip,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new OK({
      message: "Published products fetched successfully",
      metadata: await ProductServiceV2.findAllPublishedForShop({
        product_shop: req.user.userId,
        limit: req.query.limit,
        skip: req.query.skip,
      }),
    }).send(res);
  };

  searchProductsByUser = async (req, res, next) => {
    new OK({
      message: "Products fetched successfully",
      metadata: await ProductServiceV2.searchProductsByUser(req.params),
    }).send(res);
  };
}

module.exports = new ProductController();
