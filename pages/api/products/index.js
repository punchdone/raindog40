import connectDB from '../../../connectDB';
import Product from '../../../models/Product/product';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const product = await new Product(data).save();
        return res.status(201).json(product);
    } else {
        const products = await Product.find()
            .populate('category')
            .populate('productLine')
            .populate('variations')
        return res.status(200).json(products);
    }
};