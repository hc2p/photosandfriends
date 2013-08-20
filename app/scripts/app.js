'use strict';

angular.module('photosandfriendsApp', ['dropstore-ng', 'ngCookies'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:param', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });