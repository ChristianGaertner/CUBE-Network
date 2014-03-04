'use strict';

angular.module('cubeNetworkApp')
  .service('SatelliteDataService', function SatelliteDataService() {

    /**
     * PRIVATE VARIABLES
     * Contains the info data for the sats
     */
    var info = {
      g26: {
        color: '#FF0033',
        name: 'G26 Raspberry',
        observing: ['Germany/Hamburg', 'Russia/Saint Petersburg', 'USA/San Diego', 'USA/Houston'],
        path: function (i) {
          return (Math.sin(i/573) * 20) + 50.06;
        }
      },
      g11: {
        color: '#FFAA00',
        name: 'G11 Blueberry',
        observing: ['USA/New York', 'Russia/Moscow', 'China/Shanghai', 'USA/Dallas'],
        path: function (i) {
          return (Math.sin(i/573 - 30) * 20) + 38.3;
        }
      },
      g19: {
        color: '#00AAFF',
        name: 'G11 Cherry',
        observing: ['Australia/Adelaide', 'Australia/Sydney', 'French Guiana/Cayenne'],
        path: function (i) {
          return (Math.sin(i/573 + 40) * 20) - 14.7;
        }
      }
    };

    /**
     * The main object
     *
     * Methods:
     * - getName
     * - getObserved
     * - getPopup
     * - generatePath
     * - generateCurrentPos
     *
     * @return object
     */
    return {
      /**
       * Returns the name of the given SAT ID
       * @param  string SAT ID
       * @return string
       */
      getName: function (sat) {
        return info[sat].name;
      },

      /**
       * Returns the color code of the given SAT ID
       * @param  string SAT ID
       * @return string
       */
      getColor: function (sat) {
        return info[sat].color;
      },

      /**
       * Returns an array with observed cities for the given SAT ID
       * @param  string SAT ID
       * @return array
       */
      getObserved: function (sat) {
        return info[sat].observing;
      },

      /**
       * Returns a content string (HTML) which may be used as popup for the given SAT ID
       * @param  string SAT ID
       * @return string
       */
      getPopup: function (sat) {
        return this.getName(sat) + '<br /><ul><li>' + this.getObserved(sat).join('</li><li>') + '</li></ul>';
      },

      /**
       * Returns the path of the SAT (ID)
       * Returns an array with objects containing lat & lng keys
       * @param  string SAT ID
       * @return array
       */
      generatePath: function (sat) {
        if (info[sat].generatePathsCache) {
          return info[sat].generatePathsCache;
        }

        var array = [];
        var steps = 1800*2.3; // FIXED! Otherwise change in generateCurrentPos()!!
        var i;

        for (i = -steps; i <= steps; i++) {
          if (i % 100 === 0) {
            array.push({
              lat: info[sat].path(i),
              lng: i/10
            });
          }
        }

        info[sat].generatePathsCache = array;
        return array;
      },

      /**
       * Generates the current SAT position and adds an offset to it
       * This method takes care of looping and stuff
       * @param  integer offset (will get added)
       * @return integer
       */
      generateCurrentPos: function (offset) {
        //add 0.0004 to lng per second
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
      }



    };
  });
