'use strict';

angular.module('hospitalHelperApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.tasks = [];
    $scope.regOpen = false;

    $http.get('/api/tasks').success(function(receivedTasks) {
      $scope.tasks = receivedTasks;
      socket.syncUpdates('task', $scope.tasks);
    });

    $scope.addTask = function() {
      if($scope.newTask === '') {
        return;
      }
      $http.post('/api/tasks', { name: $scope.newTask });
      $scope.newTask = '';
    };

    $scope.deleteTask = function(task) {
      $http.delete('/api/tasks/' + task._id);
    };

    $scope.toggleReg = function() {
      $scope.regOpen = !$scope.regOpen;
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('task');
    });
  });
