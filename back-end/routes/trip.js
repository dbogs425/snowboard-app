var express = require("express");
var trip = require("../models/trip");
var tripRoutes = express.Router();

tripRoutes.get("/:id", function(req, res){
    var query = trip.findById(req.params.id);
    query.populate("mountain");
    query.exec(function(err, trip){
        if(err) return res.status(500).send(err);
        res.send(trip);
    });
});

tripRoutes.post("/", function(req, res){
    console.log(req.body);
    var newTrip = new trip(req.body);
    newTrip.save(function (err, trip){
        if(err) return res.status(401).send(err);
        res.send(trip);
    })
})
tripRoutes.delete("/:id", function(req, res){
    console.log(req.params);
    var id  = req.params.id;
    trip.findById(id, function(err, oldTrip){
        if(err) return res.status(500).send(err);
        res.status(201).send(oldTrip);
        oldTrip.remove();
});
});
module.exports = tripRoutes;