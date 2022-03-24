const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const backorderStatus = require('./backorderStatus');
const vendor = require('../Vendor/vendor');
const geography = require('../geography');
const comment = require('../Comment/comment');

const backorderSchema = new Schema({
  createdDate: {
      type: Date
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'vendor'
  },
  po: {
    type: String
  },
  projectNum: {
    type: String
  },
  channel: {
    type: String,
  },
  projectName: {
    type: String,
  },
  item: {
      type: String,
  },
  quantity: {
    type: Number
  },
  identified: {
    type: Boolean
  },
  identifiedDate: {
    type: Date
  },
  ordered: {
    type: Boolean
  },
  orderedDate: {
    type: Date
  },
  received: {
      type: Boolean
  },
  receivedDate: {
      type: Date
  },
  scheduled: {
    type: Boolean
  },
  scheduledDate: {
    type: Date
  },
  shipped: {
      type: Boolean
  },
  shippedDate: {
      type: Date
  },
  completed: {
    type: Boolean
  },
  completedDate: {
    type: Date
  }, 
  backorderStatus: {
    type: Schema.Types.ObjectId,
    ref: 'backorderStatus'
  },
  geography: {
    type: Schema.Types.ObjectId,
    ref: 'geography'
  },
  notes: {
      type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

// backorderSchema.pre("save", async function () {
//   try {
//     const Backorder = this.constructor;
//     const backorderExists = await Backorder.find({
//       backorderItem: this.get("backorderItem"),
//     })
//       .lean()
//       .exec();
//     if(backorderExists.length > 0) {
//       throw new Error({ message: 'we have a backorder error (part 1)!' });
//     }
//   } catch (err) {
//     throw new Error({ message: 'we have a backorder error (part 2)!' });
//   }
// });

module.exports =
    mongoose.models.backorder || mongoose.model('backorder', backorderSchema);