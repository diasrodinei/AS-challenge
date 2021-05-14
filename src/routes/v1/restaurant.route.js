const express = require('express');
const validate = require('../../middlewares/validate');
const restaurantValidation = require('../../validations/restaurant.validation');
const restaurantController = require('../../controllers/restaurant.controller');


const router = express.Router();

router
  .route('/')
  .get(validate(restaurantValidation.getRestaurants), restaurantController.getRestaurants);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurants retrieval
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get restaurants
 *     description: Retrival restaurants under a given parameters.
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: A Restaurant Name match is defined as an exact or partial String match with what users provided. For example, “Mcd” would match “Mcdonald’s”
 *       - in: query
 *         name: rate
 *         schema:
 *           type: integer
 *         description: A Customer Rating match is defined as a Customer Rating equal to or more than what users have asked for. For example, “3” would match all the 3 stars restaurants plus all the 4 stars and 5 stars restaurants.
 *       - in: query
 *         name: distance
 *         schema:
 *           type: integer
 *           minimum: 0
 *         default: 10
 *         description: A Distance match is defined as a Distance equal to or less than what users have asked for. For example, “2” would match any distance that is equal to or less than 2 miles from your company.
 *       - in: query
 *         name: price
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: A Price match is defined as a Price equal to or less than what users have asked for. For example, “15” would match any price that is equal to or less than $15 per person.
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *         description: A Cuisine match is defined as an exact or partial String match with what users provided. For example, “Chi” would match “Chinese”. You can find all the possible Cuisines in the **cuisines.csv** file. *You can assume each restaurant offers only one cuisine.*
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
