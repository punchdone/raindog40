import connectDB from '../../../connectDB';
import Backorder from '../../../models/Backorder/backorder';
import Comment from '../../../models/Comment/comment';
import { ObjectId } from 'mongodb';

connectDB();

async function handler(req, res) {
    // console.log(req.query);
    // console.log(req.query.slug[0])
    const backorderId = req.query.slug[0];
    console.log('backorderId = ' + backorderId);
    if (req.method === 'PATCH') {
        const data = req.body;
        // console.log(data);
        const comment = await new Comment(data).save();
        console.log(comment);
        const backorder = await Backorder.updateOne({ _id: ObjectId(backorderId) },
            { $addToSet: { comments: comment._id } }
        );
        res.status(201).json({ message: 'Added comment' });
    }
    return res.status(200).json({ message: 'you got here!' });
};

export default handler;