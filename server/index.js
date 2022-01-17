//importing espress
const express = require("express");
//creating express app
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//setting config variable to key value
const config = require("./config/key");

// importing mongoose
const mongoose = require("mongoose");
//checking mongodb connection
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Here we are roting the request according to the URL
app.use('/api/users', require('./routes/users'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/likedislike'));
app.use('/api/favorite', require('./routes/favorite'));

app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});