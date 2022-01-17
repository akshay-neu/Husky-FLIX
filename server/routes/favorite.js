const express = require('express');
const router = express.Router();


const favorite_controller = require('../controllers/FavoriteController');



/**
 * THis is our FavoriteRouter
 * From here we are routing it to FavoriteController with the end point /favoriteNumber, /favorited, /addToFavorite, /removeFromFavorite and /getFavoredMovie
 */
router.post("/favoriteNumber", favorite_controller.favoriteNumber);



router.post("/favorited", favorite_controller.favorited);



router.post("/addToFavorite", favorite_controller.addToFavorite);




router.post("/removeFromFavorite", favorite_controller.removeFromFavorite);



router.post("/getFavoredMovie", favorite_controller.getFavoredMovie);




module.exports = router;
