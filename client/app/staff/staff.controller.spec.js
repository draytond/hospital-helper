'use strict';

describe('Controller: StaffCtrl', function () {

  // load the controller's module
  beforeEach(module('hospitalHelperApp'));

  var StaffCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StaffCtrl = $controller('StaffCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
