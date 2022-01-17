const { Comment } = require("../models/Comment");
var comment_service = require("../services/CommentService.js");


// This is a CommentController Section

/**
 * Here router is sending request to the Controller
 * Controller is basically just getting the request and sending the response
 */
exports.getComments = function (req, res) {
  comment_service.getComments(req, res);
};

/**
 * Here router is sending the save comment request to the database and sending the response to the UI
 */
exports.saveComment = function (req, res) {
  comment_service.saveComment(req, res);
};
