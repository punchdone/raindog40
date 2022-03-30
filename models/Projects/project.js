const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const room = require('./room');

const projectSchema = new Schema({
    nid: {
        type: Number
    },
    woProjectNum: {
        type: String
    },
    dealerCode: {
        type: String
    },
    projectName: {
        type: String
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