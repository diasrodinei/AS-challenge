const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const restaurantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,      
    },
    distance: {
      type: Number,
      required: true,      
    },
    price: {
      type: Number,
      required: true,      
    },
    cuisine: {
      type: Number,
      required: true,      
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Restaurant
 */
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
