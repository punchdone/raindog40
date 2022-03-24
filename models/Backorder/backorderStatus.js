const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const backorderStatusSchema = new Schema({
  name: {
    type: String
  },
  order: {
    type: Number
  }
});

backorderStatusSchema.pre('save', async function() {
  try {
    const Status = this.constructor;
    const statusExists = await backorderStatus.find({
      name: this.get('name')
    })
      .lean()
      .exec();
    if (statusExists.length > 0) {
      throw new Error ({ message: 'A new backorderStatus error (part 1).' });
    }
  } catch (err) {
    throw new Error({ message: 'A new backorderStatus error (part 2)' });
  }
});

module.exports =
    mongoose.models.backorderStatus || mongoose.model('backorderStatus', backorderStatusSchema);