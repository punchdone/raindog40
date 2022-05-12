import connectDB from "../../../../connectDB";
import Finish from '../../../../models/Product/finish';
import { ObjectId } from "mongodb";

connectDB();

export default async function handler(req, res) {
    const finishId = req.query;
    if (req.method === 'DELETE') {
        await Finish.findByIdAndDelete(ObjectId(finishId.finishId));
        return res.status(202).json({ message: 'Door deleted!' });
    } else if (req.method === 'PUT') {
        const data = req.body;
        const finish = await Finish.updateOne({ _id: ObjectId(finishId.finishId) }, data);
        return res.status(202).json(finish);
    } else {
        const finish = await Finish.findOne({ _id: ObjectId(finishId.finishId) });
        return res.status(200).json(finish);
    }
}