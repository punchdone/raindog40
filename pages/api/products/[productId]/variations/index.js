import connectDB from '../../../../../connectDB';
import Variation from '../../../../../models/Product/variation';
import Product from '../../../../../models/Product/product';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const productId = req.query.productId;
    if (req.method === 'POST') {
        const data = req.body;
        const variation = await new Variation(data).save();
        const product = await Product.updateOne({ _id: ObjectId(productId) },
            { $addToSet: { variations: variation._id }}
        );
        return res.status(201).json(variation);
    }
};