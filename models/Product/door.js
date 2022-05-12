const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const taxonomy = require('./taxonomy');

const imageSchema = new Schema({
    url: {
        type: String
    },
    public_id: {
        type: String
    }
}, {
    timestamps: true
});

const doorSchema = new Schema({
    productLines: [
        {
            type: Schema.Types.ObjectId,
            ref: 'taxonomy'
        }
    ],
    doorName: {
        type: String
    },
    doorCode: {
        type: String
    },
    doorType: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    doorStyle: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    doorConstruction:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    railSize:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    OEprofile:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    IEprofile:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    PNLprofile:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    MiterProfile:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    GrainDirection:  {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    images: [
        {
            type: imageSchema
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.models.door || mongoose.model('door', doorSchema);