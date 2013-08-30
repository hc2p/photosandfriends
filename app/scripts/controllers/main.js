'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropboxAuth',
    function MainCtrl($scope, dropboxAuth) {

      $scope.isAuthenticated = function() {
        return false;
        //dropboxAuth.isAuthenticated;
      }

      $scope.connectDropbox = function() {
        dropboxAuth.connectDropbox();
      }
    }	
]);