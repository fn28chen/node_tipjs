'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'success'
//     });
// })

// check apiKey
router.use(apiKey);
// check permissions
router.use(permission('0000'));

router.use('/v1/api/product', require('./product/index.product'));
router.use('/v1/api', require('./access'));

module.exports = router;