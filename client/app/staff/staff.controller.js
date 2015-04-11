'use strict';

angular.module('hospitalHelperApp')
  .controller('StaffCtrl', function ($scope, $http, $rootScope, socket) {
    $scope.tasks = [];
    $scope.users = [];
    $scope.targetStaff = [];
    $scope.staffMember = $rootScope.user;
    $scope.newTask = {
      from: $rootScope.user._id,
      status: 'open'
    };

    $http.get('/api/users').success(function(receivedUsers) {
      $scope.users = receivedUsers;
      socket.syncUpdates('user', $scope.users);
    });

    $http.get('/api/tasks/populate').success(function(receivedTasks) {
      $scope.tasks = receivedTasks;
      socket.syncUpdates('task', $scope.tasks);
    });

    $scope.delegateTo = function(delegatedTask, sendToTarget) {
      delegatedTask.from = delegatedTask.from._id;
      delegatedTask.to = sendToTarget;
      $http.put('/api/tasks/' + delegatedTask._id, delegatedTask)
        .success(function(receivedTasks) {
          console.log('task: ', delegatedTask);
          socket.syncUpdates('task', $scope.tasks);
        });
    };
  });
