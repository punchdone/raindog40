const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const lineSchema = new Schema({
    lineNum: {
        type: Number
    },
    configCode: {
        type: String
    },
    quantity: {
        type: Number
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    depth: {
        type: Number
    },
    hinging: {
        type: String
    },
    ends: {
        type: String
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.line || mongoose.model('line', lineSchema);