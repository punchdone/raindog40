import connectDB from '../../../../connectDB';
import Project from '../../../../models/Projects/project';

connectDB();

export default async function handler(req, res) {
    const projectId = req.query.projectId;
    const project = await Project.find({ proposalNum: projectId });
    return res.status(200).json(project);
};