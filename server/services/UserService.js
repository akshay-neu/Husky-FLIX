const { User } = require("../models/User");



//Form here we are loging the data in the database
exports.loginNew = function (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
};


//From this method we are adding a new user to our database
exports.registerNew = function (req, res) {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
};


//THis basically tells us whether the user is Authenticated or not
exports.authNew = function (req, res) {
  console.log("auth New");
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
};


//THis method helps us to logout from the database
exports.logoutNew = function (req, res) {
  console.log("Logout New");
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
};



//this method basically tells us whether the user is subscribed or not
exports.subscribed = function (req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { subscribed : true}, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
        success: true
    });
});
};

