'use strict';

angular.module('hospitalHelperApp')
  .controller('PatientCtrl', function ($scope, $http, $rootScope, socket, Task) {
    //console.log('factory answer of life: ', task.someMethod());
    $scope.tasks = []
    $scope.newTask = {
      from: $rootScope.user._id,
      status: 'open'
    };
    $scope.patient = $rootScope.user;

    $scope.tasks = Task.query(function() {
      socket.syncUpdates('task', $scope.tasks);
    });

    $scope.addTask = function() {
      if($scope.newTask.text === '') {
        return;
      }
      $http.post('/api/tasks', $scope.newTask);
      $scope.newTask = {
        from: $rootScope.user._id,
        status: 'open'
      };
    };

    $scope.deleteTask = function(task) {
      $http.delete('/api/tasks/' + task._id);
    };

    $scope.theFilter = $rootScope.user._id;
  });
