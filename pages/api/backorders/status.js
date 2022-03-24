import connectDB from '../../../connectDB';
import BackorderStatus from '../../../models/Backorder/backorderStatus';

connectDB();

async function handler(req, res) {
    if( req.method === 'POST') {
        const data = req.body;
        const status = await new BackorderStatus(data).save();
        res.status(201).json({ message: 'Status Added!' });
    } else {
        const status = await BackorderStatus.find();
        res.status(200).json(status);
    }
};

export default handler;