'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideoAddCtrl
 * @description
 * # VideoAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VideoAddCtrl', function (
    $scope,
    Video,
    $location) {
    $scope.video = {};
    $scope.saveVideo = function() {
      Video.post($scope.video).then(function() {
        $location.path('/videos');
      });
    };
  });
