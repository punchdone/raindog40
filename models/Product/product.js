const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const taxonomy = require('./taxonomy');
const variation = require('./variation');

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

const productSchema = new Schema({
    productLine: {
        type: Schema.Types.ObjectId,
        ref: 'taxonomy'
    },
    category: {
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
    variations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'variation'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.models.product || mongoose.model('product', productSchema);