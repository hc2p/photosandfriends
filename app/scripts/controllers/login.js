'use strict';

angular.module('photosandfriendsApp')
.controller('LoginCtrl', ['$scope', '$location', 'dropboxAuth',
  function LoginCtrl($scope, $location, dropboxAuth) {
    dropboxAuth.authDeferred.then(function(isAuthenticated) {
      if (isAuthenticated) {
        $location.path( "/home" );
      }
    });

    $scope.user = {
      isAuthenticated: dropboxAuth.authDeferred
    };

    $scope.connectDropbox = function() {
      dropboxAuth.connectDropbox();
    };
  }
]);