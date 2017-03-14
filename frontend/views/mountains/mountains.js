angular.module("mountainView", ["ngRoute"])

.config(function ($routeProvider) {
    $routeProvider.when("/find-mountains", {
        templateUrl: "views/mountains/mountains.html",
        controller: "mountainController"
    }).when("/find-mountains/:name", {
        templateUrl: "views/mountains/mountain-detail.html",
        controller: "mountainDetail"
    });
})

.controller("mountainController", ["$scope", "$http", "mountainService", function ($scope, $http, mountainService) {
    $scope.mountains = [];

    mountainService.getMountains().then(function (response) {
        $scope.mountains = response;
    });

}])

.controller("mountainDetail", ["$scope", "$http", "mountainService", "userService", "$routeParams", function ($scope, $http, mountainService, userService, $routeParams) {
    $scope.nameFilter = "";
    mountainService.getCurrent().then(function (response) {
        console.log(response);
        $scope.currentMountain = response[0];
    });
    $scope.addMountain = function(){
        var id = $routeParams.name;
        userService.addFavorite(id);
    }
}]);