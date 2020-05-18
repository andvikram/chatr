const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    lowercase: true
  },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
  timestamps: true
});

User.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('User', User);
