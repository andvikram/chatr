const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let Room = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true
  }
}, {
  timestamps: true
});

Room.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Room', Room);