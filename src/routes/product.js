const express = require('express');

const ProductController = require('../controllers/ProductController');

let router = express.Router();

router.post('/create', ProductController.create);

router.get('/admin/list', ProductController.listAdminSide);

router.get('/customer/list', ProductController.listCustomerSide);

module.exports = router;
