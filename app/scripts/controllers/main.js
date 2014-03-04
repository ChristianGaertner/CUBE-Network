'use strict';

var generatePathsCache = {};
var generatePaths = function(sat) {

  if (generatePathsCache[sat]) {
    return generatePathsCache[sat];
  }

  var array = [];
  var steps = 1800*2.3; // FIXED! Otherwise change in generateCurrentPos()!!
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


  generatePathsCache[sat] = array;
  return array;
};

//add 0.0004 to lng per second
var generateCurrentPos = function (offset) {
  var now = new Date();
  var then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0);
  var diff = now.getTime() - then.getTime();

  // div by 1000 to convert to seconds
  var pos = Math.round(diff/1000 * 0.0004) + 5 + offset;
  if (pos > 40) {
    return pos - 40;
  }

  return pos;
};

generateCurrentPos(0);

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
        dragging: false,
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
      markers: {
        g26: {
          lat: generatePaths('g26')[generateCurrentPos(0)].lat,
          lng: generatePaths('g26')[generateCurrentPos(0)].lng,
          icon: {
            iconUrl: 'images/satellite-raspberry.png',
            iconSize: [50, 50],
            iconAnchor: [25, 25],
            popupAnchor: [-3, -76],
          }
        },
        g11: {
          lat: generatePaths('g11')[generateCurrentPos(20)].lat - 5,
          lng: generatePaths('g11')[generateCurrentPos(20)].lng - 5,
          icon: {
            iconUrl: 'images/satellite-blueberry.png',
            iconSize: [50, 50],
            conAnchor: [-80, -80],
            popupAnchor: [-3, -76],
          }
        },
        g19: {
          lat: generatePaths('g19')[generateCurrentPos(30)].lat - 5,
          lng: generatePaths('g19')[generateCurrentPos(30)].lng - 5,
          icon: {
            iconUrl: 'images/satellite-cherry.png',
            iconSize: [50, 50],
            conAnchor: [-80, -80],
            popupAnchor: [-3, -76],
          }
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
