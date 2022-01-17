const express = require('express');
const router = express.Router();
// const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");
const comment_controller = require("../controllers/CommentController.js");


/**
 * Routing is basically done for getting the request from the UI and sending it to the correct controller
 * 
 */



/**
 * THis is our CommentRouter
 * From here we are routing it to Comment Controller with the end point /saveComment and /getComments
 */
router.post("/saveComment", comment_controller.saveComment);


router.post("/getComments", comment_controller.getComments);


module.exports = router;
