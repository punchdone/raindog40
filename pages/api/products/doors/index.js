import connectDB from '../../../../connectDB';
import Door from '../../../../models/Product/door';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const door = await new Door(data).save();
        return res.status(201).json(door);
    } else {
        const doors = await Door.find();
        return res.status(200).json(doors);
    }
}