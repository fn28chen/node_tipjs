'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

router.use(authenticationV2);
router.get('/search/:keySearch', asyncHandler(productController.searchProductsByUser));

router.post('/create', asyncHandler(productController.createProduct));
router.post('/publish/:id', asyncHandler(productController.createProduct));
router.post('/unpublish/:id', asyncHandler(productController.unPublishProduct));

// Query
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop));
router.get('/publish/all', asyncHandler(productController.getAllPublishedForShop));

module.exports = router;