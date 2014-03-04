'use strict';

describe('Service: Satellitedataservice', function () {

  // load the service's module
  beforeEach(module('cubeNetworkApp'));

  // instantiate service
  var Satellitedataservice;
  beforeEach(inject(function (_Satellitedataservice_) {
    Satellitedataservice = _Satellitedataservice_;
  }));

  it('should do something', function () {
    expect(!!Satellitedataservice).toBe(true);
  });

});
