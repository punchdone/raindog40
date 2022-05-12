import connectDB from "../../../../connectDB";
import Door from "../../../../models/Product/door";
import { ObjectId } from "mongodb";

connectDB();

export default async function handler(req, res) {
    const doorId = req.query;
    if (req.method === 'DELETE') {
        await Door.findByIdAndDelete(ObjectId(doorId.doorId));
        return res.status(202).json({ message: 'Door deleted!' });
    } else if (req.method === 'PUT') {
        const data = req.body;
        const door = await Door.updateOne({ _id: ObjectId(doorId.doorId) }, data);
        return res.status(202).json(door);
    } else {
        const door = await Door.findOne({ _id: ObjectId(doorId.doorId) });
        return res.status(200).json(door);
    }
}