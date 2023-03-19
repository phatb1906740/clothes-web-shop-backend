const express = require('express');

const OrderController = require('../controllers/OrderController');

let router = express.Router();

router.post('/create', OrderController.create);

router.get('/admin/list', OrderController.listAdminSide);

router.put('/change-status/:order_id/:state_id', OrderController.changeStatus);

module.exports = router;
