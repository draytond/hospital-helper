'use strict';

angular.module('hospitalHelperApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.tasks = [];
    $scope.users = [];
    $scope.regOpen = false;
    $scope.newUser = {
      role: 'patient'
    };
    $scope.registerPrompt = 'No username?';
    $scope.registerBtnTxt = 'Register';

    $http.get('/api/tasks').success(function(receivedTasks) {
      $scope.tasks = receivedTasks;
      socket.syncUpdates('task', $scope.tasks);
    });

    $http.get('/api/users').success(function(receivedUsers) {
      $scope.users = receivedUsers;
      socket.syncUpdates('user', $scope.users);
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

    $scope.registerUser = function(user) {
      $http.post('/api/users', user).
      success(function(data, status, headers, config) {
        console.log('success: ', data);
        if ($scope.alreadyExists) {
          $scope.alreadyExists = false;
        }
        // go to logged-in side of site
      }).
      error(function(data, status, headers, config) {
        // username field has unique index in MongoDB, so you'll get an
        // error if you try to enter a username that
        // already exists in the database
        $scope.alreadyExists = true;
      });
      //$scope.toggleReg();
    };

    $scope.toggleReg = function() {
      $scope.regOpen = !$scope.regOpen;
      if ($scope.registerPrompt === 'No username?') {
        $scope.registerPrompt = 'Already registered?';
      } else {
        $scope.registerPrompt = 'No username?';
      }
      if ($scope.registerBtnTxt === 'Register') {
        $scope.registerBtnTxt = 'Login';
      } else {
        $scope.registerBtnTxt = 'Register';
      }
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('task');
    });
  });
