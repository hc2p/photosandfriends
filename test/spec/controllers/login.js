'use strict';

describe('Controller: LoginCtrl', function () {

  beforeEach(angular.mock.module('photosandfriendsApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should have user obj in scope', function () {
    expect(scope.user).toBeDefined();
  });
});
