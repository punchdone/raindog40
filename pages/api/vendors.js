import connectDB from '../../connectDB';
import Vendor from '../../models/Vendor/vendor';

connectDB();

async function handler(req, res) {
    console.log(req.method);

    if(req.method === 'POST') {
        const data = req.body;
        const geography = await new Vendor(data).save();
        return res.status(201).json({ message: 'Vendor added.' });
    } else {
        const vendors = await Vendor.find();
        return res.status(200).send(vendors);
    }

};

export default handler;