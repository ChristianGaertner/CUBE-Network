'use strict';

angular.module('cubeNetworkApp')
  .controller('AboutCtrl', function ($scope, SatelliteDataService) {
    $scope.SatelliteDataService = SatelliteDataService;
  });
