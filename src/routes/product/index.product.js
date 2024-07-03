'use strict'

const express = require('express');
const productController = require('../../controllers/product.controller');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

router.get('/search/:keySearch', asyncHandler(productController.searchProductsByUser));
router.get('/all', asyncHandler(productController.findAllProducts));
router.get('/:product_id', asyncHandler(productController.findProducts));

router.use(authenticationV2);

router.post('/create', asyncHandler(productController.createProduct));
router.post('/publish/:id', asyncHandler(productController.createProduct));
router.post('/unpublish/:id', asyncHandler(productController.unPublishProduct));

// Update
router.patch('/update/:product_id', asyncHandler(productController.updateProduct));

// Query
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop));
router.get('/publish/all', asyncHandler(productController.getAllPublishedForShop));

module.exports = router;