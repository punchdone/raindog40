import connectDB from '../../../../connectDB';
import Room from '../../../../models/Projects/room';

connectDB();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const room = await new Room(req.body).save();
        return res.status(201).json(room);
    } else {
        const rooms = await Room.find();
        return res.status(200).json(rooms);
    }
}