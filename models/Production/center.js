const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const taxonomy = require('./taxonomy')

const centerSchema = new Schema({
    title: {
        type: String
    },
    activities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'taxonomy'
        }
    ]
});

module.exports = mongoose.models.center || mongoose.model('center', centerSchema);