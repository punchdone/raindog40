import { ObjectId } from 'mongodb';
import connectDB from '../../../../../connectDB';
import Project from '../../../../../models/Projects/project';
import Room from '../../../../../models/Projects/room';

connectDB();

export default async function handler(req, res) {
    const projectId = req.query.projectId;
    if (req.method === 'POST') {
        console.log('projectId = ' + projectId);
        const data = req.body;
        console.log(data);
        const room = await new Room(data).save();
        const project = await Project.updateOne({ _id: ObjectId(projectId) },
            { $addToSet: { rooms: room._id }}
        );
        res.status(201).json(room);
    } else {
        console.log(req.query);
        // const project = await Project.find({ proposalNum: })

        return res.status(200).json({ message: 'these lines can be reached through the project' });
    }
};