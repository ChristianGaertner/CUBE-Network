'use strict';

describe('Service: MapDataService', function () {

  // load the service's module
  beforeEach(module('cubeNetworkApp'));

  // instantiate service
  var MapDataService,
      SatelliteDataService;
  beforeEach(inject(function (_MapDataService_, _SatelliteDataService_) {
    SatelliteDataService = _SatelliteDataService_;
    MapDataService = _MapDataService_;
  }));

  it('should has a few methods', function () {
    expect(MapDataService.getMap).toBeDefined();
    expect(MapDataService.getDefaults).toBeDefined();
    expect(MapDataService.getCenter).toBeDefined();
    expect(MapDataService.getPathLayer).toBeDefined();
    expect(MapDataService.getMarkerLayer).toBeDefined();

  });

  it('should return objects on method calls', function () {
    expect(MapDataService.getMap(SatelliteDataService)).toBeDefined();
    expect(MapDataService.getDefaults()).toBeDefined();
    expect(MapDataService.getCenter()).toBeDefined();
    expect(MapDataService.getPathLayer(SatelliteDataService)).toBeDefined();
    expect(MapDataService.getMarkerLayer(SatelliteDataService)).toBeDefined();
  });

  it('should create a toogle function in the getMap method', function () {
    expect(MapDataService.getMap(SatelliteDataService).toogleSat).toBeDefined();
  })

});
