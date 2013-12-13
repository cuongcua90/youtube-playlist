'use strict';

describe('Service: Youtubeservice', function () {

  // load the service's module
  beforeEach(module('magicListenApp'));

  // instantiate service
  var Youtubeservice;
  beforeEach(inject(function (_Youtubeservice_) {
    Youtubeservice = _Youtubeservice_;
  }));

  it('should do something', function () {
    expect(!!Youtubeservice).toBe(true);
  });

});
