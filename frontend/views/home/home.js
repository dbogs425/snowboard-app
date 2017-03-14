angular.module("homeView", ["ngRoute", "geolocation"])

.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "views/home/home.html",
        controller: "homeController"
    }).when("/home/:username", {
        templateUrl: "views/home/userhome.html",
        controller: "homeController"
    });
})

.controller("homeController", ["$scope", "$http", "$routeParams", "userService", "geolocation", function ($scope, $http, $routeParams, userService, geolocation) {
    $scope.userLocation = {};
    $scope.currentUser = {};
    userService.getInfo().then(function (response) {
        $scope.currentUser = response;
    });
    geolocation.getLocation().then(function (data) {
        console.log(data);
        $scope.coords = {
            lat: data.coords.latitude,
            long: data.coords.longitude
        };
        sessionStorage.setItem("lat", data.coords.latitude);
        sessionStorage.setItem("long", data.coords.longitude);
    });

}]);