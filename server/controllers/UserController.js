// const { User } = require("../models/User");
var user_service = require("../services/UserService");
// UserController
//From this controller method we are able to login in to the database
// So every controller method over here will get the request from the UI with the help of router and sending the request to the Services
//And also we are sending the response to the database
exports.loginNew = function (req, res) {
  user_service.loginNew(req, res);
};

//This methods router the registration request to the user service and send the response to the database
exports.registerNew = function (req, res) {
  user_service.registerNew(req, res);
};

//This method basically helps us to authenticate the user
exports.authNew = function (req, res) {
  user_service.authNew(req, res);
};

//this method basicaaly helps us to logout
//It will basically send the request to the user service and get the responsse from it
exports.logoutNew = function (req, res) {
  user_service.logoutNew(req, res);
};

//Subsrcibed also helps us to get the data whether user is subscribed or not?
exports.subscribed = function(req, res) {
  user_service.subscribed(req, res)
}

