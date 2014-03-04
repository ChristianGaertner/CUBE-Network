'use strict';

describe('Controller: AboutctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('cubeNetworkApp'));

  var AboutctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutctrlCtrl = $controller('AboutctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
