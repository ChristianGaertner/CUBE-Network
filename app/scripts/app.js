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
    $rootScope.APP_NAME = 'CUBE Network';
    $rootScope.AUTHER = {
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
      .otherwise({
        redirectTo: '/'
      });
  });
