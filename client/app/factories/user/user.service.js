'use strict';

angular.module('hospitalHelperApp').factory('User', function ($resource) {
  return $resource('/api/users/:id', null,
    {
      'update': {method: 'PUT'}
    });
});
