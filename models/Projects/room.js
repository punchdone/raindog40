const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const order = require('./order');
const taxonomy = require('../Product/taxonomy')

const roomSchema = new Schema({
    roomNum: {
        type: Number
    },
    roomName: {
        type: String
    },
    orderType: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    orderStatus: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    orderTotal: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.room || mongoose.model('room', roomSchema);