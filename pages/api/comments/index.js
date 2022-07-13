import connectDB from '../../../connectDB';
import Comment from '../../../models/Comment/comment';


connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log(data);
        const comment = await new Comment(data).save();
        res.status(201).json({ message: 'Comment Added!' });
    } else {
        const comments = await Comment.find()
            .populate('type')
            .populate('author');
        return res.status(200).json(comments);
    }
};