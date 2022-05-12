import connectDB from '../../../../connectDB';
import Finish from '../../../../models/Product/finish';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const finish = await new Finish(data).save();
        return res.status(201).json(finish);
    } else {
        const finishes = await Finish.find();
        return res.status(200).json(finishes);
    }
}