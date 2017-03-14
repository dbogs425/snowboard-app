var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var morgan = require("morgan");
var config = require("./config");
var expressJwt = require("express-jwt");

var app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(bodyParser.json());

app.use("/auth", require("./routes/authroutes"));
app.use("/mountains",expressJwt({secret: config.secret}), require("./routes/mountain"));
app.use("/user",expressJwt({secret: config.secret}), require("./routes/user"));
app.use("/trip", expressJwt({secret: config.secret}), require("./routes/trip"));

mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log("Connected to database");
});

app.listen(2000, function () {
    console.log('Now listening on port 2000');
});