'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropstoreClient', '$cookieStore', '$timeout',
    function MainCtrl($scope, dropstoreClient, $cookieStore, $timeout) {
      
      var client = dropstoreClient.create({key: 'h5yz9hzhs9ddj2w'});
      var _datastore;
      
      $scope.connectDropbox = function() {
        $cookieStore.put('secondStep', true);
        $timeout(function() {
          client.authenticate({interactive: true});
        },1, false);
      };

      $scope.isNotAuthenticated = false;
      
      // Try to finish OAuth authorization.
      var secondStep = $cookieStore.get('secondStep', true);
      if (secondStep) {
        $timeout(function() {
          client.authenticate({interactive: true}).
            then(function(datastoreManager){
              console.log('completed authentication on load');
              return datastoreManager.openDefaultDatastore();
          });
        },1,false);
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