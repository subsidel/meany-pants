'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideoEditCtrl
 * @description
 * # VideoEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('VideoEditCtrl', function (
  $scope,
  $routeParams,
  Video,
  $location
) {
  $scope.editVideo = true;
  $scope.video = {};
  Video.one($routeParams.id).get().then(function(video) {
    $scope.video = video;
    $scope.saveVideo = function() {
      $scope.video.save().then(function() {
        $location.path('/video/' + $routeParams.id);
      });
    };
  });
});
