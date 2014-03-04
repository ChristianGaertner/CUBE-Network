'use strict';

angular.module('cubeNetworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'leaflet-directive'
])
  /**
   * Set global variables
   *  - like the app's name or auther information
   */
  .run(function ($rootScope) {
    $rootScope.APP = {
      NAME: 'CUBE Network',
      VERSION: '0.0.2'
    };
    $rootScope.AUTHOR = {
      name: 'Christian Gärtner',
      url: 'http://christiangaertner.tk/?feature=CUBE'
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/missioncontrol', {
        templateUrl: 'views/missioncontrol.html',
        controller: 'MissioncontrolCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })


      .when('/404', {
        templateUrl: '404.html'
      })
      .otherwise({
        redirectTo: '/404'
      });
  });
