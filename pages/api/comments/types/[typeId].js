import connectDB from '../../../../connectDB';
import CommentType from '../../../../model/Comment/commentType';
import { ObjectId } from 'mongodb';

connectDB();

async function handler(req, res) {

        const typeId = req.query;
        const type = await CommentType.findOne({ _id: ObjectId(typeId.typeId) });
        return res.status(200).json(type);
};

export default handler;