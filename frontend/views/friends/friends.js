angular.module("friendView", ["ngRoute"])

.config(function ($routeProvider) {
    $routeProvider.when("/friends", {
        templateUrl: "views/friends/friends.html",
        controller: "friendController"
    }).when("/friends/:username", {
        templateUrl: "views/friends/friend-detail.html",
        controller: "friendDetailController"
    });
})

.controller("friendController", ["$scope", "$http", "userService", function ($scope, $http, userService) {
        $scope.users = {};
        userService.getInfo().then(function (response) {
            $scope.currentUser = response;
        })
        userService.getUsers().then(function (response) {
            $scope.users = response;
        });
        $scope.addFriend = function (user) {
            var y = true;
            for (var x = 0; x < $scope.currentUser.friends.length; x++) {
                console.log($scope.currentUser.friends[x]._id);
                if ($scope.currentUser.friends[x]._id == user._id) {
                    var y = false;
                }
            }
            if (y === true) {
                userService.addFriend(user).then(function (response) {
                    console.log(response);
                    userService.getInfo().then(function (response) {
                        $scope.currentUser = response;
                    });
                    alert("friend added");
                });
            } else {
                alert("Already added " + user.firstName);
            }
        };
        $scope.removeFriend = function (friend) {
            userService.removeFriend(friend);
            userService.getInfo().then(function (response) {
                $scope.currentUser = response;
            });
            alert("Friend Removed");
            userService.getInfo().then(function (response) {
                $scope.currentUser = response;
            });
        }
}])
    .controller("friendDetailController", ["$scope", "$http", "userService", "$routeParams", function ($scope, $http, userService, $routeParams) {
        userService.getFriendInfo($routeParams.username).then(function (response) {
            $scope.friend = response;
        });
        $scope.addTrip = function (tripId) {
            userService.addTrip(tripId);
        };
}]);