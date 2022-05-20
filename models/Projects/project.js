const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const room = require('./room');
const taxonomy = require('../Product/taxonomy');

const projectSchema = new Schema({
    nid: {
        type: Number
    },
    proposalNum: {
        type: String
    },
    woProjectNum: {
        type: String
    },
    channel: {
        type: String
    },
    projectName: {
        type: String
    },
    deliveryGeography: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    productLine: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    rooms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'room'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.models.project || mongoose.model('project', projectSchema);