'use strict';

angular.module('hospitalHelperApp')
  .controller('PatientCtrl', function ($scope, $http, $rootScope, socket) {
    $scope.tasks = []
    $scope.newTask = {
      from: $rootScope.user._id,
      status: 'open'
    };
    console.log('the user on the rootscope is: ', $rootScope.user);
    $scope.patient = $rootScope.user;

    $http.get('/api/tasks').success(function(receivedTasks) {
      $scope.tasks = receivedTasks;
      console.log('tasks: ', $scope.tasks);
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
  });
