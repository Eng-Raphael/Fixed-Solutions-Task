const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Asset = require('../models/Asset');


// Create an in-memory cache
const cache = {};

// @desc    Search for images or videos using keywords
// @route   GET /api/nasa/search?q={q}
// @access  Public
exports.search = asyncHandler(async (req, res, next) => {

    
    const { q, page = 1, limit = 10 } = req.query;
    const maxLimit = 50; // Maximum limit that a user can request
    const url = `https://images-api.nasa.gov/search?q=${q}&page=${page}&media_type=image,video`;

    
    // Check if limit is greater than maximum limit
    const validatedLimit = Math.min(limit, maxLimit);
    // Check if data is cached in memory
    const cacheKey = `${q}-${page}-${validatedLimit}`;
    if (cache[cacheKey]) {
        console.log('Using cached data from memory');
        const data = cache[cacheKey];
        res.status(200).json({
          success: true,
          count: data.collection.items.length,
          data: data.collection.items,
        });
    } else {
        console.log('Fetching data from NASA API');
        const response = await fetch(url);
        const data = await response.json();
        // Cache data in memory for 1 hour
        cache[cacheKey] = data;
        setTimeout(() => {
          delete cache[cacheKey];
        }, 60 * 60 * 1000); // Expire cache after 1 hour
        const startIndex = (page - 1) * validatedLimit;
        const endIndex = page * validatedLimit;
        const results = data.collection.items.slice(startIndex, endIndex);
        res.status(200).json({
          success: true,
          count: results.length,
          data: results,
        });
    }

});


// @desc    Add video to user's favorites
// @route   POST /api/users/:userId/nasa/:nasaId
// @access  Private
exports.addToFavorite = asyncHandler(async (req, res, next) => {

  const {
     title , 
     description ,
     photographer,
     url ,
     media_type
  } = req.body;

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }
  
  const Nasa_id = req.params.nasaId;

  const asset = await Asset.create({
    title,
    description,
    photographer,
    url,
    media_type,
    nasa_id : Nasa_id
  });

  user.favorites.push(asset._id);
  await user.save();

  res.status(200).json({
    success: true,
    data: asset,
  });

}); 


// @desc    Remove video from user's favorites
// @route   DELETE /api/users/:userId/nasa/:nasaId
// @access  Private
exports.removeFromFavorite = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const asset = await Asset.findOne({ nasa_id: req.params.nasaId });

  if (!asset) {
    return res.status(404).json({
      success: false,
      message: 'Asset not found',
    });
  }

  // Remove asset from user's favorites
  user.favorites.pull(asset._id);
  await user.save();

  // Check if asset is referenced by any other users
  const assetUsers = await User.find({ favorites: asset._id });
  if (assetUsers.length === 0) {
    // Delete asset from database if not referenced by any other users
    await Asset.findByIdAndDelete(asset._id);
  }

  res.status(200).json({
    success: true,
    message: 'Asset removed from favorites',
  });
});