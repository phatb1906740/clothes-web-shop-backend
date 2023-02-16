const express = require('express');

const uploadImage = require('../midlewares/uploadImage');
const ProductVariantController = require('../controllers/ProductVariantController');

let router = express.Router();

router.post('/create', ProductVariantController.create);

module.exports = router;
