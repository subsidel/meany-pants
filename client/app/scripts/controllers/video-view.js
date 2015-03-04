'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideoViewCtrl
 * @description
 * # VideoViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('VideoViewCtrl', function (
  $scope,
  $routeParams,
  Video
) {
  $scope.viewVideo = true;
  $scope.video = Video.one($routeParams.id).get().$object;
});
