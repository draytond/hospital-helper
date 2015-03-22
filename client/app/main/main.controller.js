'use strict';

angular.module('hospitalHelperApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.tasks = [];
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

    $scope.users = [
      {
        name: 'Jake Williamson',
        role: 'staff',
        position: 'doctor'
      },{
        name: 'Marcia Williams',
        role: 'staff',
        position: 'nurse'
      },{
        name: 'David Fei',
        role: 'patient',
        room: 3
      },{
        name: 'Elizabeth Drayton',
        role: 'staff',
        position: 'doctor'
      },{
        name: 'Mary Lane',
        role: 'patient',
        room: 14
      },{
        name: 'Theresa Garcia',
        role: 'staff',
        position: 'nurse'
      },{
        name: 'Joe Szlosek',
        role: 'patient',
        room: 34
      },{
        name: 'Blue Johnson',
        role: 'staff',
        position: 'nurse'
      },{
        name: 'Harry Olson',
        role: 'patient',
        room: 12
      },{
        name: 'Jerry Kent',
        role: 'staff',
        position: 'floor staff'
      }
    ];

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
