var express = require("express");
var User = require("../models/users");
var userRoute = express.Router();

userRoute.get("/current", function (req, res) {
    var query = User.findOne({
        username: req.headers.username
    });
    query.populate({
        path: "trips",
        populate: {
            path: "mountain",
        }
    });
    query.populate("favoriteMountains");
    query.populate("friends");
    query.exec(function (err, user) {
        if (err) return res.status(500).send(err);
        res.send(user);
    });

});

userRoute.put("/favorite", function (req, res) {
    console.log(req.body);
    User.findOne({
        _id: req.body.userId
    }, function (err, user) {
        if (err) res.send(res.status(500));
        user.favoriteMountains.push(req.body.mtnId);
        user.save();
        res.send(user);
    })
})

userRoute.put("/trip", function (req, res) {
    console.log(req.body);
    User.findOne({
        _id: req.body.userId
    }, function (err, user) {
        if (err) res.send(res.status(500));
        user.trips.push(req.body.tripId);
        user.save();
        res.send(user);
    })
})
userRoute.put("/deletetrip", function (req, res) {
    console.log(req.body);
    var userId = req.body.userId;
    var tripId = req.body.tripId;
    User.findOne({
        _id: req.body.userId
    }, function (err, user) {
        console.log(user);
        for (var x = 0; x < user.trips.length; x++) {
            if (user.trips[x] == tripId) {
                user.trips.splice(x, 1);
                res.send(user.trips[x]);
            }
        }
    });
});
userRoute.get("/", function (req, res) {
    var query = User.find(function (err, users) {
        query.populate({
            path: "trips",
            populate: {
                path: "mountain",
            }
        });
        query.populate("favoriteMountains");
        query.populate("friends");
        query.exec(function (err, users) {
            if (err) return res.status(500).send(err);
            res.send(users);
        })
    });
});
userRoute.put("/friend", function (req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    User.findOne({
        _id: userId
    }, function (err, user) {
        if (err) return res.status(500).send(err);
        user.friends.push(friendId);
        user.save();
        res.send(user);
    });
});
userRoute.put("/deletefriend", function (req, res) {
    var userId = req.body.userId;
    var friendId = req.body.friendId;
    User.findOne({
        _id: req.body.userId
    }, function (err, user) {
        if (err) return res.status(500).send(err);
        console.log(user.friends[1]);
        for (var x = 0; x < user.friends.length; x++) {
            if (user.friends[x] == friendId) {
                user.friends.splice(x, 1);
                user.save();
                return ("Friend Removed");
            }
        }
    });
});
userRoute.get("/friend", function (req, res) {
    console.log(req.headers);
    var query = User.findOne({
        username: req.headers.username
    });
    query.populate({
        path: "trips",
        populate: {
            path: "mountain",
        }
    });
    query.populate("favoriteMountains");
    query.populate("friends");
    query.exec(function (err, user) {
        if (err) return res.status(500).send(err);
        res.send(user);
    });

})
module.exports = userRoute;