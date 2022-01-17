const { Comment } = require("../models/Comment");


// Here we are saving the comments in the database
exports.saveComment = function (req, res) {
        const comment = new Comment(req.body)

    //save method is used to saving in the database
    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        //Here we are finding the comments with the id and then we will save it
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
  };

//   Here we are getting the the commands from the database 
  exports.getComments = function (req, res) {
          Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
  };

