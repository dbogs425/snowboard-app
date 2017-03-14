var mongoose = require("mongoose");

var tripSchema = new mongoose.Schema({
    name: String,
    date: Date,
    niceDate: String,
    mountain: [{type: mongoose.Schema.Types.ObjectId,
               ref: 'Mountain'}],
});
    
var Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;