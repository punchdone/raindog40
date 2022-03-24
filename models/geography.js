const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const geographySchema = new Schema({
  areaName: {
    type: String
  },
  color: {
      type: String
  }
});

module.exports =
    mongoose.models.geography || mongoose.model('geography', geographySchema);