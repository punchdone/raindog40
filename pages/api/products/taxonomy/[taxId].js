import connectDB from '../../../../connectDB';
import Taxonomy from '../../../../models/Product/taxonomy';
import { ObjectId, Objectid } from 'mongodb';

connectDB();

export default async function handler(req, res) {
    const taxId = req.query;
    const taxonomy = await Taxonomy.findOne({ _id: ObjectId(taxId.taxId) });
    return res.status(200).json(taxonomy)
};