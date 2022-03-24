const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
// const validator = 'validator';
const role = require('../User/role');

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'role'
  },
  channel: {
    type: String
  }
});

module.exports =
    mongoose.models.user || mongoose.model('user', userSchema);
