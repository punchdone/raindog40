const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const order = require('./order');

const roomSchema = new Schema({
    roomNum: {
        type: String
    },
    roomName: {
        type: String
    },
    orderType: {
        type: Number
    },
    status: {
        type: Number
    },
    order: {
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