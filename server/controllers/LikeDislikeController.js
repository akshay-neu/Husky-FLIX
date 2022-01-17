var likedislike_service = require("../services/LikeDislikeService");

//This is a LikeDislikeCOntroller
/**
 * req paramater is basically getting the request from the database and res is response 
 */
//getLike methods send the req to the likedislike service and it will send the result to the UI
exports.getLikes = function (req, res) {
    likedislike_service.getLikes(req, res);
  };

//getDisLike methods send the req to the likedislike service and it will send the result to the UI
  exports.getDislikes = function (req, res) {
    likedislike_service.getDislikes(req, res);
  };

//upLike methods send the req to the likedislike service and it will send the result to the UI
  exports.upLike = function (req, res) {
    likedislike_service.upLike(req, res);
  };

//unLike methods send the req to the likedislike service and it will send the result to the UI
  exports.unLike = function (req, res) {
    likedislike_service.unLike(req, res);
  };
//unDisLike methods send the req to the likedislike service and it will send the result to the UI
  exports.unDisLike = function (req, res) {
    likedislike_service.unDisLike(req, res);
  };
  //upDisLike methods send the req to the likedislike service and it will send the result to the UI
  exports.upDisLike = function (req, res) {
    likedislike_service.upDisLike(req, res);
  };
