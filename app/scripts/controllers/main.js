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
            var _i = i;
            var callback = function(res) {
              
            };
            fileReader.readAsDataUrl(element.files[i], scope).then((function() {
              var file = element.files[_i];
              return function(res) {
                file.data = res;
                scope.files.push(file);
              }
            })());
          }
          scope.progressVisible = false
        });
      };

      // the parser function
      function parse(s){
          var os = [], m;
          var regex = /(?:"([^"]+)")? ?<?(.*?@[^>,]+)>?,? ?/g;
          while(m=regex.exec(s)){
              os.push({name:m[1],email:m[2]});
          }
          return os;
      }

      scope.handleShare = function(value) {
        if (! this.files || this.files.length < 1) return false;
        var contacts = parse(this.shareTo);
        var res = dropboxAuth.share(this.title, this.files, contacts);
        console.log(res);
      }
    }	
]);