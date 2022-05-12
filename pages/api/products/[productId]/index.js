import connectDB from '../../../../connectDB';
import Product from '../../../../models/Product/product';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const productId = req.query;
    // console.log(productId);
    if (req.method === 'PUT') {
        const data = req.body;
        // console.log(data);
        const product = await Product.updateOne({ _id: ObjectId(productId.productId) }, data);
        return res.status(202).json(product);
    } else {
        const product = await Product.findOne({ _id: ObjectId(productId.productId) })
            .populate('category')
            .populate('variations')
            .populate('productLine');
        return res.status(200).json(product);
    }

    
}