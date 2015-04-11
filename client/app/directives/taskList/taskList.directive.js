'use strict';

angular.module('hospitalHelperApp')
  .directive('taskList', function () {
    return {
      templateUrl: 'app/directives/taskList/taskList.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });