const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const redis = require('redis');
const { promisify } = require('util');
const advancedResults = require('../middleware/advancedResults');


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

