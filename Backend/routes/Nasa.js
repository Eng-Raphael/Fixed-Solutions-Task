const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');

const { search } = require('../controllers/nasa');
const{ protect } = require('../middleware/auth');

router
.route('/search')
.get(protect, search);

module.exports = router;