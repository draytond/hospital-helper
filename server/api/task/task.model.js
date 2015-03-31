'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  text: String,
  status: String,
  created: { type : Date, default: Date.now },
  finished: Date
});

module.exports = mongoose.model('Task', TaskSchema);
