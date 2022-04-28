import connectDB from '../../../../../connectDB';
import Variation from '../../../../../models/Product/variation';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const variationId = req.query.variationId;
    // console.log(variationId);
    if (req.method === 'PUT') {
        const data = req.body;
        console.log(data);
        const variation = await Variation.updateOne({ _id: ObjectId(variationId) }, data);
        return res.status(202).json(variation);
    } else {
        const variation = await Variation.findOne({ _id: ObjectId(variationId) })
            .populate('subCategory')
            .populate('dimensions')
            .populate('counts')
            .populate('pricing')
            .populate('counts')
        return res.status(200).json(variation);
    }
}