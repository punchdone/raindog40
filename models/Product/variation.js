const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const taxonomy = require('./taxonomy');

const dimensionSchema = new Schema({
    direction: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    standard: Number,
    min: Number,
    max: Number,
    fixed: Boolean
});

const pricingSchema = new Schema({
    priceLevel1: Number,
    priceLevel2: Number,
    priceLevel3: Number,
    priceLevel4: Number,
    priceLevel5: Number,
    priceLevel6: Number,
    priceLevel7: Number,
    priceLevel8: Number
});

const countSchema = new Schema({
    topDrawer: Number,
    lowerDrawer: Number,
    falseFront: Number,
    door: Number,
    shelf: Number,
    partition: Number,
    finInt: Boolean,
    faceframe: Boolean,
    angle: Number, 
    faces: Number
});

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

const variationSchema = new Schema({
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    configCode: {
        type: String
    },
    title: {
        type: String
    },
    images: [
        {
            type: imageSchema
        }
    ],
    dimensions: [
        {
            type: dimensionSchema
        }
    ],
    counts: {
        type: countSchema
    },
    pricing: {
        type: pricingSchema
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.variation || mongoose.model('variation', variationSchema);