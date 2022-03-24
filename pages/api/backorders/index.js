import connectDB from '../../../connectDB';
import Backorder from '../../../models/Backorder/backorder';
// import Geography from '../../../model/geography';
// import Vendor from '../../../model/Vendor/vendor';
// import BackorderStatus from '../../../model/Backorder/backorderStatus';

connectDB();

async function handler(req, res) {

    // const client = await MongoClient.connect('mongodb+srv://rw_user:wood2good@cluster0.gooul.mongodb.net/backorders?retryWrites=true&w=majority');

    // const db = client.db();

    // const backorderCollection = db.collection('backorders');

    if (req.method === 'POST') {
        const data = req.body;
        const backorder = await new Backorder(data).save();
        res.status(201).json({ message: 'Backorder Added! '});
    } else {
        const backorders = await Backorder.find()
            .populate('vendor')
            .populate('backorderStatus')
            .populate('geography')
            .populate('comments');
        return res.status(200).json(backorders);
    }
}

export default handler;