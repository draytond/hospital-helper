'use strict';

angular.module('hospitalHelperApp')
  .controller('StaffCtrl', function ($scope, $http, $rootScope, socket, Task, User) {
    $scope.targetStaff = [];
    $scope.staffMember = $rootScope.user;

    $scope.users = User.query(function() {
      socket.syncUpdates('user', $scope.users);
    });

    $scope.tasks = Task.query(function() {
      socket.syncUpdates('task', $scope.tasks);
    });

    $scope.delegateTo = function(delegatedTask, sendToTarget) {
      if (!delegatedTask || !sendToTarget) {
        return;
      } else {
        delegatedTask.from = delegatedTask.from._id;
        delegatedTask.to = sendToTarget;
        $http.put('/api/tasks/' + delegatedTask._id, delegatedTask)
          .success(function() {
            socket.syncUpdates('task', $scope.tasks);
          });
      }
    };
  });
