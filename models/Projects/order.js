const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const line = require('./line');
const taxonomy = require('../Product/taxonomy');

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
        type: String
    },
    material: {
        type: String
    },
    interior: {
        type: String
    },
    drawerType: {
        type: String
    },
    doorStyle: {
        type: String
    },
    doorType: {
        type: String
    },
    doorContruction: {
        type: String
    },
    railSize: {
        type: String
    },
    ieProfile: {
        type: String
    },
    oeProfile: {
        type: String
    }, 
    panelProfile: {
        type: String
    },
    topDrawerType: {
        type: String
    },
    hinging: {
        type: String
    },
    guides: {
        type: String
    },
    material: {
        type: String
    },
    finish: {
        type: String
    },
    finishType: {
        type: String
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