
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");


const { auth } = require("../middleware/auth");
const user_controller = require("../controllers/UserController");

/**
 * This is our UserRouter 
 * Here we are sending the data to the UserController
 */

router.get("/auth", auth, user_controller.authNew);


router.post("/register", user_controller.registerNew);


router.post("/login", user_controller.loginNew);


router.get("/logout", auth, user_controller.logoutNew);

router.put("/subscribed", auth, user_controller.subscribed)



module.exports = router;
