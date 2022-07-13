import connectDB from '../../../../../connectDB';
import Project from '../../../../../models/Projects/project';

connectDB();

export default async function handler (req, res) {
    const woProjectNum = req.query.woProjectNum;
    console.log('woProjectNum = ' + woProjectNum);
    const project = await Project.find({ woProjectNum })
        .populate({
            path: 'rooms',
            strictPopulate: false,
            populate: {
                path: 'order',
                strictPopulate: false,
                populate: {
                    path: 'lines'
                }
            }
        });
    return res.status(200).json(project);
}   