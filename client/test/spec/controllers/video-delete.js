'use strict';

describe('Controller: VideoDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var VideoDeleteCtrl,
    scope,
    Video,
    location,
    promiseFun,
    videoId,
    routeParams;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    videoId = undefined;
    promiseFun = undefined;
    routeParams = {id: 'ThisID'};

    scope = $rootScope.$new();

    var mockPromise = {
      then:function() {
      }
    };

    var mockRequests = {
      get: function() {
      },
      remove: function() {
      }
    };

    Video = {
      one: function() {
      }
    };

    location = {
      path: function(){}
    };

    spyOn(Video, 'one').and.callFake(function(id) {
      videoId = id;
      return mockRequests;
    });
    spyOn(mockPromise, 'then').and.callFake(function(fun) {
      promiseFun = fun;
    });
    spyOn(mockRequests, 'remove').and.returnValue(mockPromise);
    spyOn(mockRequests, 'get').and.returnValue({$object: mockRequests});
    spyOn(location, 'path');

    VideoDeleteCtrl = $controller('VideoDeleteCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      Video: Video,
      $location: location
    });

  }));

  it('should be able to remove a video and then return to the videos page', function() {
    scope.deleteVideo();
    expect(typeof promiseFun).toEqual('function');
    promiseFun();
    expect(location.path).toHaveBeenCalledWith('/videos');
  });
  it('should be able return to the video page of whichevers video id was passed through the route', function() {
    scope.back();
    expect(location.path).toHaveBeenCalledWith('/videos/' + routeParams.id);
  });


});
