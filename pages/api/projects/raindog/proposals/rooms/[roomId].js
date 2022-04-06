import axios from 'axios';

async function handler(req, res) {
    const roomId = req.query.roomId;
    const roomUrl = 'https://dev-raindog.pantheonsite.io/rest/node/' + roomId;
    const room = await axios(roomUrl);
    return res.status(200).json(room.data);
};

export default handler;