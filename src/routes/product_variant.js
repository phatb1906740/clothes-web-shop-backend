const express = require('express');

const uploadImage = require('../midlewares/uploadImage');
const ProductVariantController = require('../controllers/ProductVariantController');

let router = express.Router();

router.post('/create', ProductVariantController.create);

router.put('/on', ProductVariantController.onState);

router.put('/off', ProductVariantController.offState);

router.put('/update-price', ProductVariantController.updatePrice);

router.put('/update-quantity', ProductVariantController.updateQuantity);

router.delete('/delete', ProductVariantController.deleteProductVariant);


module.exports = router;
