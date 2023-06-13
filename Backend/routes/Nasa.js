const express = require('express');
const router = express.Router();
const advancedResults = require('../middleware/advancedResults');

const { search , addToFavorite , removeFromFavorite , searchAssets} = require('../controllers/nasa');
const{ protect } = require('../middleware/auth');

router
.route('/search')
.get(protect, search);

router // /api/users/:userId/favorites
.route('/addToFavorite/user/:userId/nasa/:nasaId')
.post(protect, addToFavorite);

router //api/users/:userId/nasa/:nasaId
.route('/removeFromFavorite/user/:userId/nasa/:nasaId')
.delete(protect, removeFromFavorite);

router
.route('/searchAssets')
.get(protect, searchAssets );

module.exports = router;