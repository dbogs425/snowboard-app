var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    friends: [{
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    favoriteMountains: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mountain'
    }],
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    }]
});

userSchema.pre("save", function(next){
    var user = this;
    if(!this.isModified("password")) return next();
    bcrypt.hash(user.password, 10, function(err, hash){
       if(err) return next(err);
        user.password = hash;
        next();
    });
});
userSchema.methods.checkPassword = function (passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    })
}
userSchema.methods.withoutPassword = function(){
    var user = this.toObject();
    delete user.password;
    return user;
}

var User = mongoose.model("User", userSchema);
module.exports = User;