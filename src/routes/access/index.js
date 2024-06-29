'use strict'

const express = require('express');
const accessController = require('../../controllers/access.controller');
const router = express.Router();
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

// signUp
router.post('/shop/signup', asyncHandler(accessController.signUp));
// logIn
router.post('/shop/login', asyncHandler(accessController.login));

// authentication //
router.use(authenticationV2);

// logOut
router.post('/shop/logout', asyncHandler(accessController.logout));
// refreshToken
router.post('/shop/refresh-token', asyncHandler(accessController.handlerRefreshToken));

module.exports = router;