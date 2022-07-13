import { ObjectId } from 'mongodb';
import connectDB from '../../../../connectDB';
import Project from '../../../../models/Projects/project';

connectDB();

export default async function handler(req, res) {
    const projectId = req.query.projectId;
    const project = await Project.find({ _id: ObjectId(projectId) })
        .populate({
            path: 'rooms',
            // strictPopulate: false,
            populate: {
                path: 'order',
                // strictPopulate: false,
                populate: {
                    path: 'lines'
                }
            }
        });
    return res.status(200).json(project);
};