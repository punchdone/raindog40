import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'punchdone',
    api_key: '817178694395177',
    api_secret: 'yhwdhhh9sy6t8rxzfUX3iIupM_0'
})

export default async function handler(req, res) {
    const imageId = req.query;
    console.log(imageId);
    if (req.method === 'DELETE') {
        cloudinary.v2.api.delete_resources('my-uploads/' + imageId.imageId);
        return res.status(202).json({ message: 'Image deleted!' })
    }
};

// import connectDB from '../../../connectDB';
// import Product from '../../../models/Product/variation';
// import { ObjectId } from 'mongodb';

// connectDB();

// export default async function handler(req, res) {
//     const productId = req.query.productId;
//     const imageId = req.query.imageId;
//     if(req.method === 'DELETE') {
//         const product = await Product.updateOne({ _id: ObjectId(productId)},
//             { $pull: { images: { _id: ObjectId(imageId) } } }
//         );
//         res.status(202).json({ message: 'Image removed successfully!' });
//     }
// };