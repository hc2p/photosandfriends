'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropboxAuth',
    function MainCtrl($scope, dropboxAuth) {

      $scope.isAuthenticated = dropboxAuth.dataStoreDeferred();

      $scope.connectDropbox = function() {
        dropboxAuth.connectDropbox();
      }
    }	
]);