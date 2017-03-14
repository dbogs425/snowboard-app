var mongoose = require("mongoose");

var mountainSchema = new mongoose.Schema({
    name: String,
    Summit_Height: Number,
    Base_Height: Number,
    Number_of_Trails: Number,
    Number_of_Lifts: Number,
    Number_of_Parks: String,
    Trail_Map: String,
    Logo: String,
    Photos: String,
    Address: String,
    Latitude: Number,
    Longitude: Number,
    Website: String

});

var Mountain = mongoose.model("Mountain", mountainSchema);
module.exports = Mountain;