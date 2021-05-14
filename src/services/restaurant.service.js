const httpStatus = require('http-status');
const { Restaurant } = require('../models');
const ApiError = require('../utils/ApiError');
const csv =require("csvtojson");
const path = require('path')

/**
 * Query for restaurants
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const queryRestaurants = async (filter) => {
  
  // CHALLENGE CORE CODE ///////////////////////////////////////////////////////////////////////

  // ASSUMPTIONS:
  //  1. The main goal is to understand how I organized the entire project into the paths and
  //     how I developed the search algorithm, therefore I didn't use any of the "out of the box"
  //     available packages and didn't load any of the infos into a database.
  // 

  // declaring some usefull variables
  let restaurants = new Array();
  let cuisines = new Array();
  let matchPrice = new Array();
  let matchDistance = new Array();
  let matchName = new Array();
  let matchRate = new Array();
  let matchCuisine = new Array();
  const price = filter.price || false;
  const distance = filter.distance || false;
  const name = filter.name || false;
  const cuisine = filter.cuisine || false;
  const rate = filter.rate || false;
  
  // set the filenames
  const restaurantsFileName='restaurants.csv';
  const cuisinesFileName='cuisines.csv';  

  // set the full paths 
  restaurantsFullPath = path.join(__dirname,"..","..","data",restaurantsFileName);
  cuisinesFullPath = path.join(__dirname,"..","..","data",cuisinesFileName);

  // converting from csv to json
  const restaurantsJson = await csv().fromFile(restaurantsFullPath);
  const cuisinesJson = await csv().fromFile(cuisinesFullPath);

  // merging restaurants and cuisines to simulate a SQL JOIN
  let cuisineArray = new Array();
  cuisinesJson.forEach((value)=>{
    cuisineArray[value.id] = value.name;
  });
  for(var i = 0; i < restaurantsJson.length; i++){
    restaurantsJson[i].cuisine_name = cuisineArray[restaurantsJson[i].cuisine_id];
  }
  

  // filtering functions
  // REQ: A Restaurant Name match is defined as an exact or partial String match with what users provided. 
  const nameFilter = (value) => {return value.name.indexOf(name) >= 0;}  
  // REQ: A Cuisine match is defined as an exact or partial String match with what users provided. 
  const cuisineFilter = (value) => {return value.cuisine_name.indexOf(cuisine) >= 0;}  
  // REQ: A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. 
  const rateFilter = (value) => {return value.customer_rating >= rate;}
  // REQ: A Distance match is defined as a Distance equal to or less than what users have asked for. 
  const distanceFilter = (value) => {return value.distance <= distance;}
  // REQ: A Price match is defined as a Price equal to or less than what users have asked for. 
  const priceFilter = (value) => {return value.price <= price;}  

  // aplying filters to simulate a SQL WHERE
  restaurants = restaurantsJson;
  if(cuisine){restaurants = restaurantsJson.filter(cuisineFilter);}
  if(rate){restaurants = restaurantsJson.filter(rateFilter);}
  if(distance){restaurants = restaurantsJson.filter(distanceFilter);}
  if(name){restaurants = restaurantsJson.filter(nameFilter);}
  if(price){restaurants = restaurantsJson.filter(priceFilter);}

  // aplying ordering to simulate a SQL ORDER BY distance  
  restaurants.sort((a,b)=>{return parseInt(a.distance) - parseInt(b.distance)})  
  
  // aplying limiting to simulate a SQL LIMIT - that can help a lot to save processing
  if(restaurants.length>5){restaurants = restaurants.slice(0,5);}
  
  // aplying ordering to simulate a SQL ORDER BY distance, customer_rating DESC, price
  restaurants.sort((a,b)=>{
    if(parseInt(a.distance) < parseInt(b.distance)){return -1;}
    else if(parseInt(a.distance) > parseInt(b.distance)){return 1;}
    else if (parseInt(a.customer_rating) > parseInt(b.customer_rating)) {return -1;}
    else if(parseInt(a.customer_rating) < parseInt(b.customer_rating)) {return 1;}
    else return parseInt(a.price) - parseInt(b.price);    
  })  

  // the next step was just for fun, as the instructions allowed me to choose randomly the last one if the criterias was equal
  if(restaurants.length > 1){
    if(restaurants[restaurants.length-1].distance == restaurants[restaurants.length-2].distance &&
       restaurants[restaurants.length-1].price == restaurants[restaurants.length-2].price &&
       restaurants[restaurants.length-1].customer_rating == restaurants[restaurants.length-2].customer_rating){                  
         if(Math.round(Math.random())==1){
           // change
           let temp1 = restaurants[restaurants.length-1];
           let temp2 = restaurants[restaurants.length-2];
           restaurants[restaurants.length-1] = temp2;
           restaurants[restaurants.length-2] = temp1;
          }
    }
  }
  
  return restaurants;

  // END OF CHALLENGE CORE CODE ////////////////////////////////////////////////////////////////  
};

module.exports = {  
  queryRestaurants
};
