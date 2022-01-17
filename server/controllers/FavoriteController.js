var favorite_service = require("../services/FavoriteService");
// Favorite

/**
 * Controllers are just for getting the request and sending the response to the UI
 */

// favoriteNumber is basically just sending the total number of movie that has been added to the favorite list
exports.favoriteNumber = function (req, res) {
    favorite_service.favoriteNumber(req, res);
};

// favorited method is just telling us whether you have mentioned that movie or allready that movie is present in the favorited list
exports.favorited = function (req, res) {
    favorite_service.favorited(req, res);
  };

  // addToFavorite Method is basically adding the movie in the movie database
  exports.addToFavorite = function (req, res) {
    favorite_service.addToFavorite(req, res);
  };

  // This method is helping us to remove the favorited movie from the database
  exports.removeFromFavorite = function (req, res) {
    favorite_service.removeFromFavorite(req, res);
  };

  // From this method we are getting the favored movie from the database
  exports.getFavoredMovie = function (req, res) {
    favorite_service.getFavoredMovie(req, res);
  };