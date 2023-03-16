const express = require('express');

const OrderController = require('../controllers/OrderController');

let router = express.Router();

router.post('/create', OrderController.create);

router.get('/admin/list', OrderController.listAdminSide);

module.exports = router;
