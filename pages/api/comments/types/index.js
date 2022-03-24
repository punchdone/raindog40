import connectDB from '../../../../connectDB';
import CommentType from '../../../../model/Comment/commentType';

connectDB();

async function handler(req, res) {
    if( req.method === 'POST') {
        const data = req.body;
        const status = await new CommentType(data).save();
        res.status(201).json({ message: 'Type Added!' });
    } else {
        const status = await CommentType.find();
        res.status(200).json(status);
    }
};

export default handler;