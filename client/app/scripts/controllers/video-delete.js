'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideoDeleteCtrl
 * @description
 * # VideoDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('VideoDeleteCtrl', function (
  $scope,
  $routeParams,
  Video,
  $location
) {
  $scope.video = Video.one($routeParams.id).get().$object;
  $scope.deleteVideo = function() {
    $scope.video.remove().then(function() {
      $location.path('/videos');
    });
  };
  $scope.back = function() {
    $location.path('/videos/' + $routeParams.id);
  };
});
