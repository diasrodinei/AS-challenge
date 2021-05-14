const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');

const getRestaurants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name','rate', 'distance', 'price', 'cuisine']);  
  const result = await restaurantService.queryRestaurants(filter);
  res.send(result);
});

module.exports = {  
  getRestaurants
};
