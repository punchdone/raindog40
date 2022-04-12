import { ObjectId } from 'mongodb';
import connectDB from '../../../../../connectDB';
import Order from '../../../../../models/Projects/order';

connectDB();

export default async function handler(req, res) {
    const orderId = req.query.orderId;
    const order = await Order.find({ _id: ObjectId(orderId) })
        .populate('lines')
    return res.status(200).json(order);
};