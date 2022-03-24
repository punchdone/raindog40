const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const vendorSchema = new Schema({
  name: {
    type: String
  }
});

module.exports =
    mongoose.models.vendor || mongoose.model('vendor', vendorSchema);