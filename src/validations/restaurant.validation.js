const Joi = require('joi');

const getRestaurants = {
  query: Joi.object().keys({
    name: Joi.string(),
    rate: Joi.number(),
    distance: Joi.number(),
    price: Joi.number(),
    cuisine: Joi.string()
  }),
};


module.exports = {  
  getRestaurants
};
