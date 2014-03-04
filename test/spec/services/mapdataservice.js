'use strict';

describe('Service: Mapdataservice', function () {

  // load the service's module
  beforeEach(module('cubeNetworkApp'));

  // instantiate service
  var Mapdataservice;
  beforeEach(inject(function (_Mapdataservice_) {
    Mapdataservice = _Mapdataservice_;
  }));

  it('should do something', function () {
    expect(!!Mapdataservice).toBe(true);
  });

});
