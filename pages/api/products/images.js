import middleware from '../../../middleware/middleware';
import nextConnect from 'next-connect';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'punchdone',
    api_key: '817178694395177',
    api_secret: 'yhwdhhh9sy6t8rxzfUX3iIupM_0'
})

const cloudinaryUpload = file => cloudinary.uploader.upload(file);

export const config = {
    api: {
        bodyParser: false
    }
};

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
    // console.log(req.body);
    // console.log(req.files);
    try {
        if (!req.files) {
            throw new Error('Image is not presented!');
        }
            const uploadResult = await cloudinaryUpload(req.files.file);
            return res.json({ cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url });
    } catch(e) {
        return res.status(422).json({ message: e.message });
    }
});

export default handler;