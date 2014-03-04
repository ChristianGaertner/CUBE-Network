'use strict';

angular.module('cubeNetworkApp')
  .controller('MainCtrl', function ($scope, MapDataService, SatelliteDataService) {
    $scope.map = MapDataService.getMap(SatelliteDataService);
    $scope.SatelliteDataService = SatelliteDataService;
  });
