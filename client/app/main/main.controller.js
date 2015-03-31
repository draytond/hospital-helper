'use strict';

angular.module('hospitalHelperApp')
  .controller('MainCtrl', function ($scope, $http, $state, $rootScope, socket) {
    $scope.users = [];
    $scope.regOpen = false;
    $scope.newUser = {
      role: 'patient'
    };
    $scope.registerPrompt = 'No username?';
    $scope.registerBtnTxt = 'Register';

    $http.get('/api/users').success(function(receivedUsers) {
      $scope.users = receivedUsers;
      socket.syncUpdates('user', $scope.users);
    });

    $scope.login = function(username) {
      $http.get('/api/users/' + username)
        .success(function(receivedUser) {
          if(receivedUser) {
            $rootScope.user = receivedUser;
            console.log(username + ' exists...logging in!');
            if(receivedUser.role === 'patient') {
              $state.go("patient", {}, { location: false } );
            } else {
              $state.go("staff", {}, { location: false } );
            }
          }
          $scope.usernameExists = false;
          $scope.usernameNotFound = false;
      }).error(function(error) {
        $scope.usernameNotFound = true;
        console.log(username + ' not found... pop up error');
      });
    };

    $scope.registerUser = function(user) {
      $http.get('/api/users/' + user.username)
        .success(function(receivedUser) {  // username already exists
          if(receivedUser) {
            console.log('username already exists...');
            $scope.alreadyExists = true;
          }
      }).error(function(error) { // proceed to register user
        console.log('in error block...');
        console.log(error);
        if(error === 'Not Found') {
          console.log('in "not found" block...about to POST');
          $http.post('/api/users', user)
            .success(function(data, status, headers, config) {
              console.log('successfully POSTed: ', data);
              if ($scope.alreadyExists) {
                $scope.alreadyExists = false;
              }
              // display the login form without the registration form
              $scope.toggleReg();
            })
          };
        }
      )
    };

    $scope.toggleReg = function() {
      $scope.usernameNotFound = false;
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
