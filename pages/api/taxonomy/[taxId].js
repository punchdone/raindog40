import connectDB from '../../../connectDB';
import Taxonomy from '../../../models/Product/taxonomy';
import { ObjectId } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const taxId = req.query;
    // console.log(taxId);
    // console.log(req.method);
    if (req.method === 'DELETE') {
        await Taxonomy.findOneAndDelete({ _id: ObjectId(taxId.taxId) });
        return res.status(202).json({ message: 'Taxonomy element deleted!' });
    } else if (req.method === 'PUT') {
        const data = req.body;
        const item = await Taxonomy.updateOne({ _id: ObjectId(taxId.taxId) }, data);
        return res.status(202).json(item);
    } else {
        const taxonomy = await Taxonomy.findOne({ _id: ObjectId(taxId.taxId) });
        return res.status(200).json(taxonomy);
    };
};