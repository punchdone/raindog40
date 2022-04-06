import connectDB from '../../../../connectDB';
import Order from '../../../../models/Projects/order';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        // console.log(data);
        const order = await new Order(data).save();
        res.status(201).json(order);
    } else {
        const orders = await Order.find()
            .populate('lines')
        return res.status(200).json(orders);
    }
};