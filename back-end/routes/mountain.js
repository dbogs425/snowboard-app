var express = require("express");
var mountain = require("../models/mountains");
var mountainRoute = express.Router();

mountainRoute.get("/", function (req, res) {
    mountain.find(function (err, mountains) {
        if (err) throw err;
        res.send(mountains);
    });
});

mountainRoute.get("/current", function(req, res){
    console.log(req.headers);
    var header = req.headers._id;
    mountain.find({_id: header}, function(err, mountain){
        if(err) throw err;
        res.send(mountain);
    })
})
module.exports = mountainRoute;