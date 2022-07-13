// import Taxonomy from '../../../models/Product/taxonomy';
// import { ObjectId } from 'mongodb';

// connectDB();

export default async function handler(req, res) {
    const area = req.query.slug[0];
    console.log(area)
    // const taxonomy = await Taxonomy.findOne({ _id: ObjectId(taxId.taxId) });
    // return res.status(200).json(message: 'You made it!')
};