/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Task = require('./task.model');

exports.register = function(socket) {
  Task.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Task.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Task.populate(doc, 'to from', function(err, task) {
    socket.emit('task:save', task);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('task:remove', doc);
}
