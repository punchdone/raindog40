import connectDB from '../../connectDB';
import Geography from '../../models/geography';

connectDB();

async function handler(req, res) {
    console.log(req.method);

    if(req.method === 'POST') {
        const data = req.body;
        const geography = await new Geography(data).save();
        return res.status(201).json({ message: 'Geography added.' });
    } else {
        const geographies = await Geography.find();
        return res.status(200).send(geographies);
    }

};

export default handler;