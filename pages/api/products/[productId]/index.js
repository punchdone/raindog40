import connectDB from '../../../../connectDB';
import Product from '../../../../models/Product/product';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const productId = req.query;
    const product = await Product.findOne({ _id: ObjectId(productId.productId) })
        .populate('category')
        .populate('subCategory')
        .populate('pricing')
        .populate('productLine')
    return res.status(200).json(product);
}