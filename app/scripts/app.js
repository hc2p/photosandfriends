'use strict';

angular.module('photosandfriendsApp', ['ngCookies'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html', 
        controller: 'LoginCtrl'})
      .otherwise({
        redirectTo: '/login'
      });
 

    $locationProvider.html5Mode(true).hashPrefix('#');
  })
  .factory('dropboxAuth', function($rootScope, $cookieStore, $q, $timeout) {
      var dropboxAuth = {};

      var _client = dropboxAuth.client = new Dropbox.Client({key: "h5yz9hzhs9ddj2w", sandbox: true})
        //.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true, useQuery: true}));

      window.datastore;

      dropboxAuth.connectDropbox = function() {        
        _client.authenticate(function(error, client) {
            if (error)
                errorHandler(error)
            else {
                deferred.resolve(client);
            }
        });
      };

      dropboxAuth.authDeferred = (function() {
              var deferred = $q.defer();
      
              _client.authenticate({interactive: false}, function(error, client){
                  if (error || ! _client.isAuthenticated())
                    deferred.resolve(false);
                  else {
                    console.log('completed authentication on load');
                    deferred.resolve(true);
                  }
                  $rootScope.$$phase || $rootScope.$apply();
              });
      
              return deferred.promise;
            })();

      return dropboxAuth;
    }
  ).
  factory('dropstore', function(dropboxAuth,$rootScope, $q, $timeout) {
    var dropstore = {}; 
    
    dropstore.sharedFolders = function() {
      var deferred = $q.defer();

      dropboxAuth.authDeferred.then(function(isAuthenticated) {
        
          if (isAuthenticated) {
            dropboxAuth.client.getDatastoreManager().openDefaultDatastore(function(err, _datastore) {
              console.log('got _datastore', _datastore);
              var sharedFoldersTable = _datastore.getTable('shared_folders');
              var sharedFolders  = sharedFoldersTable.query();
              deferred.resolve(sharedFolders);
              $rootScope.$$phase || $rootScope.$apply();
            });
          }
          else {
            deferred.reject();
            $rootScope.$$phase || $rootScope.$apply();
          }
      });
      return deferred.promise;
    };

    return dropstore;
  }).
  factory("fileReader", ["$q", "$log",  function ($q, $log) {
 
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress",
                {
                    total: event.total,
                    loaded: event.loaded
                });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
         
        var reader = getReader(deferred, scope);         
        reader.readAsDataURL(file);
         
        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL  
    };
}]);
