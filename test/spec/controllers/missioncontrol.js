'use strict';

describe('Controller: MissioncontrolCtrl', function () {

  // load the controller's module
  beforeEach(module('cubeNetworkApp'));

  var MissioncontrolCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MissioncontrolCtrl = $controller('MissioncontrolCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
