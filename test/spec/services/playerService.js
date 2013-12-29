'use strict';

describe('Service: Playerservice', function () {

  // load the service's module
  beforeEach(module('magicListenApp'));

  // instantiate service
  var Playerservice;
  beforeEach(inject(function (_Playerservice_) {
    Playerservice = _Playerservice_;
  }));

  it('should do something', function () {
    expect(!!Playerservice).toBe(true);
  });

});
