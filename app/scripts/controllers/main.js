'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropstoreClient', '$cookies',
    function MainCtrl($scope, dropstoreClient, $cookies) {
      
      var client = dropstoreClient.create({key: 'h5yz9hzhs9ddj2w'});
      var _datastore;
      
      $scope.connectDropbox = function() {
        client.authenticate({interactive: true}).then(function(datastoreManager){
          console.log('completed authentication after click');
          return datastoreManager.openDefaultDatastore();
        });
      };

      $scope.isNotAuthenticated = false;
      
      // Try to finish OAuth authorization.
      var secondStep = $cookies.secondStep;
      if (secondStep) {
        client.authenticate({interactive: true}).
          then(function(datastoreManager){
            $cookies.secondStep = true;
            console.log('completed authentication on load');
            return datastoreManager.openDefaultDatastore();
          });
      }
      else {
        if (client.isAuthenticated()) {
          // Client is authenticated. Display UI.
          $scope.isNotAuthenticated = false;
        }
        else {
          $scope.isNotAuthenticated = true;
        }
      }
    }	
]);