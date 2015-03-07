'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    var host = window.location.hostname;
    RestangularProvider.setBaseUrl('http://'+host+':8080');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/videos', {
        templateUrl: 'views/videos.html',
        controller: 'VideosCtrl'
      })
      .when('/create/video', {
        templateUrl: 'views/video-add.html',
        controller: 'VideoAddCtrl'
      })
      .when('/video/:id', {
        templateUrl: 'views/video-view.html',
        controller: 'VideoViewCtrl'
      })
      .when('/video/:id/delete', {
        templateUrl: 'views/video-delete.html',
        controller: 'VideoDeleteCtrl'
      })
      .when('/video/:id/edit', {
        templateUrl: 'views/video-edit.html',
        controller: 'VideoEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('VideoRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
.factory('Video', function(VideoRestangular) {
  return VideoRestangular.service('video');
}).directive('youtube', function() {
  return {
    restrict: 'E',
    scope: {
      src: '='
    },
    templateUrl: 'views/youtube.html'
  };
})
.filter('trusted', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
});
