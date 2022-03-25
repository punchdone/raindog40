const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const geography = require('../geography');
const line = require('./line');

const orderSchema = new Schema({
    createdDate: {
        type: Date,
        Default: Date.now()
    },
    woProjectNum: {
        type: String
    },
    projectNum: {
        type: String
    },
    poNum: {
        type: String
    },
    dealerName: {
        type: String
    },
    dealerCode: {
        type: String
    },
    projectName: {
        type: String
    },
    roomName: { 
        type: String
    },
    geography: {
        type: Schema.Types.ObjectId,
        ref: 'geography'
    },
    doorStyle: {
        type: String
    },
    drawerFrontStyle: {
        type: String
    },
    hinge: {
        type: String
    },
    guide: {
        type: String
    },
    material: {
        type: String
    },
    finish: {
        type: String
    },
    lines: [
        {
            type: Schema.Types.ObjectId,
            ref: 'line'
        }
    ]
});

module.exports = mongoose.models.order || mongoose.model('order', orderSchema);