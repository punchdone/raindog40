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

const finishSchema = new Schema({
    productLines: [
        {
            type: Schema.Types.ObjectId,
            ref: 'taxonomy'
        }
    ],
    finishName: {
        type: String
    },
    finishType: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    materials: [
        {
            type: Schema.Types.ObjectId,
            ref: 'taxonomy'
        }
    ],
    stockingLevel: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    equivalentOE: {
        type: String
    },
    equivalentRaindog: {
        type: String
    },
    images: [
        {
            type: imageSchema
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.models.finish || mongoose.model('finish', finishSchema);