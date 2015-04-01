'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  role: String,
  position: String,
  nurse: { type: Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },
  room: Number
});

module.exports = mongoose.model('User', UserSchema);
