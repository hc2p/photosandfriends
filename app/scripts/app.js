'use strict';

angular.module('photosandfriendsApp', ['ngCookies'])
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
  .factory('dropboxAuth', function($rootScope, $cookieStore, $q) {
      var dropboxAuth = {};

      var _client = new Dropbox.Client({key: "h5yz9hzhs9ddj2w", sandbox: true})
        //.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true, useQuery: true}));

      var _datastore;

      dropboxAuth.connectDropbox = function() {        
        _client.authenticate(function(error, client) {
            if (error)
                errorHandler(error)
            else {
                deferred.resolve(client);
            }
        });
      };

      dropboxAuth.authDeferred = function() {
        var deferred = $q.defer();

        _client.authenticate({interactive: false}, function(error, client){

          $rootScope.$apply(function() {
            if (error || ! _client.isAuthenticated())
              deferred.resolve(false);
            else {
              console.log('completed authentication on load');
              deferred.resolve(true);
            }
          });
        });

        return deferred.promise;
      };

      return dropboxAuth;
    }
  );