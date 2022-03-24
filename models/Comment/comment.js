const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const user = require('../User/user');
const backorder = require('../Backorder/backorder');
const commentType = require('../Comment/commentType');

const commentSchema = new Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'commentType'
    },
    content: {
        type: String
    }
});

// commentSchema.pre('save', async function() {
//     try {
//         const Comment = this.constructor;
//         const commentExists = await comment.find({
//             content: this.get('content')
//         })
//             .lean()
//             .exec();
//         if (commentExists.length > 0) {
//             throw new Error ({ message: 'A new comment error (part 1).' });
//         } 
//     } catch (err) {
//         throw new Error({ message: 'A new comment error (part 2).' });
//     }
// });

module.exports = mongoose.models.comment || mongoose.model('comment', commentSchema);