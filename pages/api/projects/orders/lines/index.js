import connectDB from '../../../../../../connectDB';
import Order from '../../../../../../models/Projects/order';
import Line from '../../../../../../models/Projects/line';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const projectId = req.query.projectId;
    // console.log('projectId = ');
    // console.log(projectId);
    if (req.method === 'POST') {
        const data = req.body;
        const line = await new Line(data).save();
        const order = await Order.updateOne({ _id: ObjectId(projectId) },
            { $addToSet: { lines: line._id }}
        );
        // const lineData = await line.json();
        // console.log(line);
        res.status(201).json(line);
    } else {
        const lines = await Line.find();
        return res.status(200).json(lines);
    }
}