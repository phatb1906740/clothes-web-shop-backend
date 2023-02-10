const express = require('express');

const CategoryController = require('../controllers/CategoryController');

let router = express.Router();

router.post('/create-level1', CategoryController.createLevel1);

router.post('/create-level2', CategoryController.createLevel2);

router.get('/list-all', CategoryController.listAll);

router.get('/list-level1', CategoryController.listLevel1);

module.exports = router;
