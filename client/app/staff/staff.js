'use strict';

angular.module('hospitalHelperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('staff', {
        url: '/staff',
        templateUrl: 'app/staff/staff.html',
        controller: 'StaffCtrl'
      });
  });