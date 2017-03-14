angular.module("dashView", ["ngRoute"])

.config(function ($routeProvider) {
    $routeProvider.when("/dashboard", {
        templateUrl: "auth/login/dashboard.html",
        controller: "dashController"
    });
})

.controller("dashController", ["$scope", "$http", "authService", "$location", function ($scope, $http, authService, $location) {
    $scope.loginMessage = "";
    $scope.login = function (userLogin) {
        $scope.loginMessage = "";
        $scope.user = {};
        authService.login(userLogin)
            .then(function (response) {
                var user = response.user;
                if (response.user) {
                    sessionStorage.setItem("username", user.username);
                    sessionStorage.setItem("id", user._id);
                    $scope.user = user;
                    $location.path("/home/");
                } else {
                    $scope.loginMessage = response.message;
                }
            });
    };
}]);