angular.module("createView", ["ngRoute"])

.config(function ($routeProvider) {
    $routeProvider.when("/create", {
        templateUrl: "auth/create/create.html",
        controller: "createController"
    });
})

.controller("createController", ["$scope", "$http", "$location", "createService", "authService", function ($scope, $http, $location, createService, authService) {
    $scope.passwordMessage = "";
    $scope.newUser = {};
    $scope.validateInfo = function (newUser, passcheck) {
        var valid = createService.validate(newUser);
        if (valid) {
            $scope.addUser(newUser, passcheck);
        } else {
            $scope.newUser = {};
            alert("Please make sure your password has a number and is at least 6 characters in length.  Also, make sure your name doesn't contain any numbers");
        }
    }
    $scope.addUser = function (newUser, passcheck) {
        $scope.passwordMessage = "";
        if (newUser.password == passcheck) {
            authService.signup(newUser)
                .then(function (response) {
                $scope.newUser = {};
                alert(response.data.message);
                if (response.config.data.username.length != 0){
                $location.path("#!/dashboard");
                }
            });
        } else{
            $scope.passwordMessage = "Passwords do not match";
        }
    }
}]);