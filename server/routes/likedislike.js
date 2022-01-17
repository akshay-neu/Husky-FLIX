const express = require('express');
const router = express.Router();


const likedislike_controller = require("../controllers/LikeDislikeController");




/**
 * This is a LikeDIslikeRouter
 * This router will help us to route the data to the database
 */


router.post("/getLikes", likedislike_controller.getLikes);




router.post("/getDislikes", likedislike_controller.getDislikes);




router.post("/upLike", likedislike_controller.upLike);




router.post("/unLike", likedislike_controller.unLike);



router.post("/unDisLike", likedislike_controller.unDisLike);

router.post("/upDisLike", likedislike_controller.upDisLike);

module.exports = router;
