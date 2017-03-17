angular.module("snowboardApp")

.service("userService", ["$http", "$routeParams", function($http, $routeParams, geolocation){
    var currentUser = {};
    var friend = {};
    this.getInfo = function(){
        var username = sessionStorage.getItem("username");
        var config = {headers: {"username": username}};
        return $http.get("/user/current", config)
        .then(function (response){
            currentUser = response.data;
            return currentUser;
        })
    }
    this.addTrip = function(tripId){
        var userId = sessionStorage.getItem('id');
        var data = {"tripId": tripId, "userId": userId};
        $http.put("/user/trip", data);
    }
    this.addFavorite = function(id){
        var userId = sessionStorage.getItem('id');
        var data = {"userId": userId, "mtnId": id};
        $http.put("/user/favorite", data);
    }
    this.deleteTrip = function(tripId, userId){
        var data = {"userId": userId, "tripId": tripId};
        return $http.put("/user/deletetrip", data).then(function(response){
            return response.data;
        });
    }
    this.getUsers = function(){
        return $http.get("/user/").then(function(response){
            return response.data;
        })
    }
    this.addFriend = function(user){
        var friendId = user._id;
        var userId = sessionStorage.getItem('id');
        var data = {"userId": userId, "friendId": friendId};
        return $http.put("/user/friend", data).then(function (response){
            return response;
        })
    }
    this.removeFriend = function(friend){
        var friendId = friend._id;
        var userId = sessionStorage.getItem('id');
        var data = {"userId": userId, "friendId": friendId};
        return $http.put("/user/deletefriend", data).then(function (response){
            return response;
        })
    }
    this.getFriendInfo = function(username){
        var config = {headers: {"username": username}};
        config.headers.username = username.substring(1,username.length);
        return $http.get("/user/friend", config)
        .then(function (response){
            friend = response.data;
            return friend;
        })
    };
}]);