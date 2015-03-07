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
    RestangularProvider.setBaseUrl('http://'+host+':8080/api/');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
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
        redirectTo: '/login'
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
  return VideoRestangular.service('videos');
})
.directive('youtube', function() {
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
})
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser({
        name: credentials.username,
        role: 'admin'
      });
      $location.path('/');
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin'
})
.factory('LoginRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
.factory('Login', function(Restangular) {
  return Restangular.service('oauth/token');
})
.factory('AuthService', function ($http, Session, $location, USER_ROLES) {
  var host = window.location.hostname;
  var authService = {};

  authService.login = function (credentials) {
    credentials.grant_type = 'password';
    credentials.client_id = 'android';
    credentials.client_secret = 'SomeRandomCharsAndNumbers';
    return $http
      .post('http://'+host +':8080/api/oauth/token', credentials)
      .then(function (res) {
        Session.create(res.data.access_token, res.data.expires_in,
                       res.data.refresh_token, res.data.token_type);
       Session.userRole = 'admin';

      });
  };

  authService.isAuthenticated = function () {
    return !!Session.access_token;
  };

  authService.isAuthorized = function (userRole) {
    return USER_ROLES[userRole];
  };

  return authService;
})
.service('Session', function () {
  this.create = function (accessToken, expireTime, refreshToken, tokenType) {
    this.accessToken = accessToken;
    this.expireTime = expireTime;
    this.refreshToken = refreshToken;
    this.tokenType = tokenType;
  };
  this.destroy = function () {
    this.accessToken = null;
    this.expireTime = null;
    this.refreshToken = null;
    this.tokenType = null;
  };
  return this;
})
.controller('ApplicationController', function ($scope,
                                               USER_ROLES,
                                               AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = function (h) {
    console.log(h);
    return AuthService.isAuthorized(h);
  }

  $scope.setCurrentUser = function (user) {
    console.log(user);
    $scope.currentUser = user;
  };
});
