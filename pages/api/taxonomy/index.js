import connectDB from '../../../connectDB';
import Taxonomy from '../../../models/Product/taxonomy';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const term = await new Taxonomy(data).save();
        res.status(201).json(term);
    } else {
        const terms = await Taxonomy.find();
        return res.status(200).json(terms);
    }
}