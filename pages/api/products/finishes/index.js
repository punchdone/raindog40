import connectDB from '../../../../connectDB';
import Finish from '../../../../models/Product/finish';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log(data);
        const finish = await new Finish(data).save();
        console.log('finish', finish);
        return res.status(201).json(finish);
    } else {
        const finishes = await Finish.find();
        return res.status(200).json(finishes);
    }
}