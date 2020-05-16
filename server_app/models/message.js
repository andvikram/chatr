const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let Message = new Schema({
  text: {
    type: String,
    required: [true, 'text is required']
  }
}, {
  timestamps: true
});

Message.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('Message', Message);