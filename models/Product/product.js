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
    door: Number,
    shelf: Number,
    partition: Number,
    finInt: Boolean,
    faceframe: Boolean,
    angle: Number, 
    faces: Number
});

const productSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
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
    productLine: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
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

module.exports = mongoose.models.product || mongoose.model('product', productSchema);