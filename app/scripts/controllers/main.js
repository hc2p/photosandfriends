'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropboxAuth',
    function MainCtrl($scope, dropboxAuth) {

      $scope.user = {
        isAuthenticated: dropboxAuth.authDeferred()
      }

      $scope.connectDropbox = function() {
        dropboxAuth.connectDropbox();
      }
    }	
]);