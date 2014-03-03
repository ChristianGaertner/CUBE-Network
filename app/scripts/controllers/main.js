'use strict';

var generatePaths = function(sat) {
  var array = [];
  var i;
  if (sat === 'g26') {
    for (i = -1800; i <= 1800; i++) {
      array.push({
        latitude: (Math.sin(i/573) * 20) + 50.06,
        longitude: i/10
      });
    }
  } else if (sat === 'g11') {
    for (i = -1800; i <= 1800; i++) {
      array.push({
        latitude: (Math.sin(i/573 - 30) * 20) + 38.3,
        longitude: i/10
      });
    }
  } else if (sat === 'g19') {
    for (i = -1800; i <= 1800; i++) {
      array.push({
        latitude: (Math.sin(i/573 + 40) * 20) - 14.7,
        longitude: i/10
      });
    }
  } else {
    throw new Error('Unknown Satellite ID!');
  }

  return array;
};

angular.module('cubeNetworkApp')
  .controller('MainCtrl', function ($scope) {
    // General Auther information
    // This will be moved into something more global ;)
    $scope.auther = {
      name: 'Christian Gärtner',
      url: 'http://christiangaertner.tk/?feature=CUBE'
    };

    // Satellite Map stuff
    $scope.map = {
      center: {
        latitude: 53.5,
        longitude: 10
      },
      zoom: 2,
      draggable: true,
      options: {
        disableDoubleClickZoom: true,
        streetViewControl: false
      }
    };

    // Satellite Paths
    $scope.satellites = {
      g26: {
        path: generatePaths('g26')
      },
      g11: {
        path: generatePaths('g11')
      },
      g19: {
        path: generatePaths('g19')
      }
    };
  });
