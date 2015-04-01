'use strict';

angular.module('hospitalHelperApp')
  .controller('StaffCtrl', function ($scope, $http, $rootScope, socket) {
    $scope.tasks = []
    $scope.newTask = {
      from: $rootScope.user._id,
      status: 'open'
    };
    console.log('the user on the rootscope is: ', $rootScope.user);
    $scope.staffMember = $rootScope.user;

    $http.get('/api/tasks/true').success(function(receivedTasks) {
      $scope.tasks = receivedTasks;
      console.log('tasks: ', $scope.tasks);
      socket.syncUpdates('task', $scope.tasks);
    });
  });
