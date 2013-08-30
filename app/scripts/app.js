'use strict';

angular.module('photosandfriendsApp', ['dropstore-ng', 'ngCookies'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/:param', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('#');
  })
  .factory('dropboxAuth', function(dropstoreClient, $cookieStore) {
      var dropboxAuth = {};
      var _client = dropstoreClient.create({key: 'h5yz9hzhs9ddj2w'});
      var _datastore;

      dropboxAuth.connectDropbox = function() {
        $cookieStore.put('secondStep', true);
        _client.authenticate({interactive: true});
      };

      dropboxAuth.dataStoreDeferred = _client.authenticate({interactive: false}).
        then(function(datastoreManager){
        console.log('completed authentication on load');
      });

      dropboxAuth.isAuthenticated = function() {
        return _client.isAuthenticated();
      }

      return dropboxAuth;
    }
  );