'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('VideosCtrl', function (
   $scope,
   Video
 ) {
   $scope.videos = Video.getList().$object;
 });
