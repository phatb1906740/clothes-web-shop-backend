const express = require('express');

const FeedbackController = require('../controllers/FeedbackController');

let router = express.Router();

router.post('/create', FeedbackController.create);

module.exports = router;
