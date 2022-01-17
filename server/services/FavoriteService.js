const { Favorite } = require("../models/Favorite");



//Here we are getting the total favorite Number from the database
exports.favoriteNumber = function (req, res) {

        Favorite.find({ "movieId": req.body.movieId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })
   
  };

  //Here we are just checking whether we have added that movie in our favorited databse or not
  exports.favorited = function (req, res) {
   
        Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, subcribed: result })
        })
};


//From here we are adding the movie to the favorited database
exports.addToFavorite = function (req, res) {

    //     console.log(req.body)

    const favorite = new Favorite(req.body);

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
   
};


//From here we are removing the movie from the database
exports.removeFromFavorite = function (req, res) {

        Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
   
};


//From here we are getting Favored movie from the database
exports.getFavoredMovie = function (req, res) {
       Favorite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favorites })
        })
};

  