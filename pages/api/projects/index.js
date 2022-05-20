import connectDB from '../../../connectDB';
import Project from '../../../models/Projects/project';
// import Order from '../../../models/Projects/order';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        console.log(data);
        const project = await new Project(data).save();
        res.status(201).json(project);
    } else {
        const projects = await Project.find()
            .populate('rooms')
            .populate('deliveryGeography')
            .populate('productLine');
        return res.status(200).json(projects);
    }
};