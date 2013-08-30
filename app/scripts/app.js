'use strict';

angular.module('photosandfriendsApp', ['dropstore-ng', 'ngCookies'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('#');
  })
  .factory('dropboxAuth', function(dropstoreClient, $cookieStore, $q) {
      var dropboxAuth = {};
      var _client = dropstoreClient.create({key: 'h5yz9hzhs9ddj2w'});
      var _datastore;

      dropboxAuth.connectDropbox = function() {
        $cookieStore.put('secondStep', true);
        _client.authenticate({interactive: true});
      };

      dropboxAuth.dataStoreDeferred = function() {
        var deferred = $q.defer();

        _client.authenticate({interactive: false}).
          then(function(datastoreManager){
            if (datastoreManager && _client.isAuthenticated()) {
              deferred.resolve(true);
              console.log('completed authentication on load');
            }
            deferred.resolve(false);
        });

        return deferred.promise;
      };

      return dropboxAuth;
    }
  );