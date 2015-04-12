'use strict';

angular.module('hospitalHelperApp').factory('Task', function ($resource) {
  return $resource('/api/tasks/:id', null,
    {
      'update': {method: 'PUT'}
    });
});
