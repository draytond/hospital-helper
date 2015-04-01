'use strict';

angular.module('hospitalHelperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patient', {
        url: '/patient',
        templateUrl: 'app/patient/patient.html',
        controller: 'PatientCtrl'
      });
  });