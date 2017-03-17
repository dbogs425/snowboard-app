angular.module("snowboardApp")

.service("mountainService", ["$http", "$routeParams", function ($http, $routeParams) {
    this.mountains = [];

    this.getTripMountains = function (input) {
        mountains = [];
        var lat1 = sessionStorage.getItem("lat");
        var lon1 = sessionStorage.getItem("long");
        return this.getMountains().then(function (response) {
            var distances = [];
            mountains = response;
            for (x = 0; x < mountains.length; x++) {
                var lon2 = mountains[x].Longitude;
                var lat2 = mountains[x].Latitude;
                var unit = 'M';
                var newDistance = distance(lat1, lon1, lat2, lon2, unit);
                mountains[x].distance = newDistance;
            }
            mountains = mountains.filter(mountain => mountain.distance <= input);
            return mountains;
        });

        function distance(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344;
            }
            if (unit == "N") {
                dist = dist * 0.8684;
            }
            if (unit == "M") {
                dist = dist;
            }
            return dist;
        }

    }
    this.getMountains = function () {
        return $http.get("/mountains")
            .then(function (response) {
                return response.data;
            })
    }
    this.getCurrent = function () {
        console.log($routeParams)
        var config = {
            headers: {
                "_id": $routeParams.name
            }
        };
        console.log(config);
        return $http.get("/mountains/current", config)
            .then(function (response) {
                console.log(response);
                return response.data;
            })
    }
            }]);