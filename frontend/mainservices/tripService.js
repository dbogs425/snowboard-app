angular.module("snowboardApp")

.service("tripService", ["$http", function ($http) {
    this.addTrip = function(trip){
        return $http.post("/trip", trip)
        .then(function (response){
            return response.data;
        });
    }
    this.deleteTrip = function(id){
        return $http.delete("/trip/" +id).then(function(response){
            return response;
        });
    }
}]);