const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let Joinee = new Schema({
  userIDs: {
    type: Array,
    default: []
  },
  roomID: {
    type: String,
    required: [true, 'roomID is required']
  }
}, {
  timestamps: true
});

Joinee.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Joinee', Joinee);