'use strict';

angular.module('cubeNetworkApp')
  .service('MapDataService', function MapDataService() {

    /**
     * Just some tmp storage
     * Used to store temporary markers and stuff
     */
    var tmpStore = {
      g26: {
        marker: false
      },
      g11: {
        marker: false
      },
      g19: {
        marker: false
      },
    };

    /**
     * The main object
     *
     * Methods:
     * - getMap
     * - getDefaults
     * - getCenter
     * - getPathLayer
     * - getMarkerLayer
     *
     * @return object
     */
    return {

      /**
       * Returns the complete object needed for the map
       * Assign it directly to the scope: $scope.map = THIS_OBJECT.getMap()
       *
       * @param  object  SatelliteDataService
       * @return object
       */
      getMap: function (SatelliteDataService) {
        return {
          defaults: this.getDefaults(),
          center: this.getCenter(),
          pathes: this.getPathLayer(SatelliteDataService),
          markers: this.getMarkerLayer(SatelliteDataService),
          /**
           * Hides the path and marker for the corres. SAT
           * @param  string  The SAT ID
           */
          toogleSat: function (sat) {
            if (this.pathes[sat].weight === 2) {
              this.pathes[sat].weight = 0;
            } else {
              this.pathes[sat].weight = 2;
            }

            if (tmpStore[sat].marker) {
              tmpStore[sat].marker = false;
              this.markers[sat] = tmpStore[sat].markerStore;
              delete tmpStore[sat].markerStore;
            } else {
              tmpStore[sat].marker = true;
              tmpStore[sat].markerStore = this.markers[sat];
              delete this.markers[sat];

            }

          },
        };
      },

      /**
       * Returns the default settings
       *
       * @return object
       */
      getDefaults: function () {
        return {
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
        };
      },

      /**
       * Returns the default center settings
       *
       * @return object
       */
      getCenter: function () {
        return {
          lat: 30,
          lng: 0,
          zoom: 1
        };
      },

      /**
       * Returns the path layer
       *
       * @param  object  SatelliteDataService
       * @return object
       */
      getPathLayer: function (SatelliteDataService) {
        return {
          g26: {
            weight: 2,
            color: '#FF0033',
            latlngs: SatelliteDataService.generatePath('g26')
          },
          g11: {
            weight: 2,
            color: '#FFAA00',
            latlngs: SatelliteDataService.generatePath('g11')
          },
          g19: {
            weight: 2,
            color: '#00AAFF',
            latlngs: SatelliteDataService.generatePath('g19')
          }
        };
      },

      /**
       * Returns the marker layer
       *
       * @param  object  SatelliteDataService
       * @return object
       */
      getMarkerLayer: function (SatelliteDataService) {
        return {
          g26: {
            lat: SatelliteDataService.generatePath('g26')[SatelliteDataService.generateCurrentPos(0)].lat,
            lng: SatelliteDataService.generatePath('g26')[SatelliteDataService.generateCurrentPos(0)].lng,
            message: SatelliteDataService.getPopup('g26'),
            icon: {
              iconUrl: 'images/satellite-raspberry.png',
              iconSize: [50, 50],
              iconAnchor: [25, 25],
              popupAnchor: [0, 0]
            }
          },
          g11: {
            lat: SatelliteDataService.generatePath('g11')[SatelliteDataService.generateCurrentPos(20)].lat - 5,
            lng: SatelliteDataService.generatePath('g11')[SatelliteDataService.generateCurrentPos(20)].lng - 5,
            message: SatelliteDataService.getPopup('g11'),
            icon: {
              iconUrl: 'images/satellite-blueberry.png',
              iconSize: [50, 50],
              iconAnchor: [25, 25],
              popupAnchor: [0, 0]
            }
          },
          g19: {
            lat: SatelliteDataService.generatePath('g19')[SatelliteDataService.generateCurrentPos(30)].lat - 5,
            lng: SatelliteDataService.generatePath('g19')[SatelliteDataService.generateCurrentPos(30)].lng - 5,
            message: SatelliteDataService.getPopup('g19'),
            icon: {
              iconUrl: 'images/satellite-cherry.png',
              iconSize: [50, 50],
              iconAnchor: [25, 25],
              popupAnchor: [0, 0]
            }
          }
        };
      }
    };


  });
