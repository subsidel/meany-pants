'use strict';

describe('Controller: VideoAddCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var VideoAddCtrl,
    scope,
    Video,
    location,
    promiseFun;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Video = {post: function() {}};
    var mockPromise = {then:function(fun){
      promiseFun = fun;
    }};
    promiseFun = undefined;
    location = {path: function(){}};

    spyOn(Video, 'post').and.returnValue(mockPromise);
    spyOn(location, 'path');

    VideoAddCtrl = $controller('VideoAddCtrl', {
      $scope: scope,
      Video: Video,
      $location: location
    });

  }));

  it('should have a video object in scope', function() {
    expect(scope.video).toEqual({});
  });

  it('should post the video object to Video when save video is called', function () {
    scope.saveVideo();
    expect(Video.post).toHaveBeenCalledWith(scope.video);
  });

  it('should call then after saving with a function to return to the /videos page', function () {
    scope.saveVideo();
    expect(typeof promiseFun).toEqual('function');
    promiseFun();
    expect(location.path).toHaveBeenCalledWith('/videos');

  });
});
