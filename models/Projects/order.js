const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const line = require('./line');
const taxonomy = require('../Product/taxonomy');
const finish = require('../Product/finish');
const door = require('../Product/door');

const orderSchema = new Schema({
    woProjectNum: {
        type: String
    },
    nid: {
        type: Number
    },
    orderRaindogId: {
        type: String
    },
    projectNum: {
        type: String
    },
    poNum: {
        type: String
    },
    roomName: { 
        type: String
    },
    productLine: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    construction: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    interior: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    drawerType: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    door: {
        type: Schema.Types.ObjectId,
        ref: 'door'
    },
    topDrawerType: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    hinge: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    guides: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    finish: {
        type: Schema.Types.ObjectId,
        ref: 'finish'
    },
    lines: [
        {
            type: Schema.Types.ObjectId,
            ref: 'line'
        }
    ]
}, {
    timestamps: true,
});

orderSchema.pre('remove', async function() {
    await Line.remove({
        _id: {
            $in: this.lines
        }
    });
});

module.exports = mongoose.models.order || mongoose.model('order', orderSchema); 