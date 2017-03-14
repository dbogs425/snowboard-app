angular.module("snowboardApp", ["geolocation", "homeView", "mountainView", "planView", "friendView","dashView", "createView", "ngMaterial", "snowboardApp.Auth"])

.config(function ($routeProvider) {
    $routeProvider.otherwise("/dashboard");
})

.controller("mainController", ["$scope", "$http", "authService", function ($scope, $http, authService) {
    $scope.logout = function(){
    authService.logout();
    }
}]);