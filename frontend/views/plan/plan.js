angular.module("planView", ["ngRoute"])

.config(function ($routeProvider) {
    $routeProvider.when("/plan-trip", {
        templateUrl: "views/plan/plan.html",
        controller: "planController"
    }).when("/plan-trip/:user", {
        templateUrl: "views/plan/mytrips.html",
        controller: "planController"
    });
})

.controller("planController", ["$scope", "$http", "mountainService", "tripService", "userService", function ($scope, $http, mountainService, tripService, userService) {
    $scope.mountains = [];
    userService.getInfo().then(function(response){
        $scope.currentUser = response;
    })
    $scope.username = sessionStorage.getItem("username");
    $scope.getMountains = function(distance){
        mountainService.getTripMountains(distance)
        .then(function (response){
            $scope.mountains = response;
        });
    }
    $scope.addTrip = function(newtrip){
        newtrip.niceDate = GetFormattedDate(newtrip.date);
        function GetFormattedDate(myDate) {
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var year = myDate .getFullYear();
        return month + "/" + day + "/" + year;
        }
        console.log(newtrip.niceDate);
        tripService.addTrip(newtrip).then(function (response){
            userService.addTrip(response._id);
            alert(newtrip.name + " added to trips");
        })
        $scope.newtrip = {};
    }
    $scope.deleteTrip = function(id){
        tripService.deleteTrip(id);
        var userId = sessionStorage.getItem("id");
        userService.deleteTrip(id, userId).then(function(response){
            console.log(response);
        });
        userService.getInfo().then(function(response){
        $scope.currentUser = response;
    });
        alert("Trip Deleted");
    }
}]);