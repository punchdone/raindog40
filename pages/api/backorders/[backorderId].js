import connectDB from '../../../connectDB';
import Backorder from '../../../models/Backorder/backorder';
import { ObjectId } from 'mongodb';

connectDB();

async function handler(req, res) {

    if (req.method === 'PATCH') {
        console.log('update the record');
    } else {
        const backorderId = req.query;
        // console.log(backorderId);
        const backorder = await Backorder.findOne({ _id: ObjectId(backorderId.backorderId) });
        return res.status(200).json(backorder);
    }
};

export default handler;