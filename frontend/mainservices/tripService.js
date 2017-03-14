angular.module("snowboardApp")

.service("tripService", ["$http", function ($http) {
    this.addTrip = function(trip){
        return $http.post("http://localhost:2000/trip", trip)
        .then(function (response){
            return response.data;
        });
    }
    this.deleteTrip = function(id){
        return $http.delete("http://localhost:2000/trip/" +id).then(function(response){
            return response;
        });
    }
}]);