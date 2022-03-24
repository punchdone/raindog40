const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const commentTypeSchema = new Schema({
    name: { 
        type: String
    },
});

// commentTypeSchema.pre('save', async function () {
//     try {
//         const Type = this.contructor;
//         const typeExists = await commentStatus.find({
//             name: this.get('name')
//         })
//             .lean()
//             .exec();
//         if (typeExists.length > 0) {
//             throw new Error({ message: 'A new commentType error (part 1).' });
//         }
//     } catch (err) {
//         throw new Error({ message: 'A new commentType error (part 2).' });
//     }
// });

module.exports = mongoose.models.commentType || mongoose.model('commentType', commentTypeSchema);