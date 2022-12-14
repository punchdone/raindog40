const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const rateSchema = new Schema({
    uom: String,
    rate: Number
});

const taxonomySchema = new Schema({
    area: {
        type: String
    },
    title: {
        type: String
    },
    equivalentOE: {
        type: String
    },
    equivalentRaindog: {
        type: String
    },
    rates: [
        { type: rateSchema }
    ]
});

module.exports = mongoose.models.taxonomy || mongoose.model('taxonomy', taxonomySchema);