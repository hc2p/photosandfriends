'use strict';

angular.module('photosandfriendsApp')
  .controller('MainCtrl', ['$scope', 'dropboxAuth', 'dropstore', 'fileReader',
    function MainCtrl(scope, dropboxAuth, dropstore, fileReader) {
      dropboxAuth.authDeferred.then(function(isAuthenticated) {
        if (! isAuthenticated) {
          $location.path( "/login" );
        }
      });

      scope.user = {
        isAuthenticated: dropboxAuth.authDeferred,
        sharedFolders: dropstore.sharedFolders()
      };

      scope.connectDropbox = function() {
        dropboxAuth.connectDropbox();
      };

      scope.setFiles = function(element) {
        scope.$apply(function(scope) {
          console.log('files:', element.files);
          // Turn the FileList object into an Array
            scope.files = []
            for (var i = 0; i < element.files.length; i++) {
              fileReader.readAsDataUrl(element.files[i], scope).then(function(res) {
                scope.files.push(res);
              });
            }
          scope.progressVisible = false
        });
      };
    }	
]);