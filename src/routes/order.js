const express = require('express');

const OrderController = require('../controllers/OrderController');

let router = express.Router();

router.post('/create', OrderController.create);

module.exports = router;
