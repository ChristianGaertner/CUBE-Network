'use strict';

var generatePaths = function(sat) {
  var array = [];
  var steps = 1800*2.3;
  var i;

  var algorithms = {
    g26: function (i) {
      return (Math.sin(i/573) * 20) + 50.06;
    },
    g11: function (i) {
      return (Math.sin(i/573 - 30) * 20) + 38.3;
    },
    g19: function (i) {
      return (Math.sin(i/573 + 40) * 20) - 14.7;
    }
  };

  for (i = -steps; i <= steps; i++) {
    if (i % 100 === 0) {
      array.push({
        lat: algorithms[sat](i),
        lng: i/10
      });
    }
  }

  return array;
};

angular.module('cubeNetworkApp')
  .controller('MainCtrl', function ($scope) {
    // Satellite Map stuff
    $scope.map = {
      defaults: {
        tileLayer: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true,
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        },
        attributionControl: true,
        maxZoom: 14,
        minZoom: 1,
        path: {
          weight: 2,
          opacity: 1,
          smoothFactor: 100
        },
        worldCopyJump: true,
        scrollWheelZoom: true,
        doubleClickZoom: false
      },
      center: {
        lat: 30,
        lng: 0,
        zoom: 1
      },
      pathes: {
        g26: {
          title: 'G26 Raspberry',
          weight: 2,
          color: '#FF0000',
          latlngs: generatePaths('g26')
        },
        g11: {
          title: 'G11 Blueberry',
          weight: 2,
          color: '#FFAA00',
          latlngs: generatePaths('g11')
        },
        g19: {
          title: 'G19 Cherry',
          weight: 2,
          color: '#FFFF00',
          latlngs: generatePaths('g19')
        }
      },
      tooglePath: function (sat) {
        if (this.pathes[sat].weight === 2) {
          this.pathes[sat].weight = 0;
        } else {
          this.pathes[sat].weight = 2;
        }
      },
    };
  });
