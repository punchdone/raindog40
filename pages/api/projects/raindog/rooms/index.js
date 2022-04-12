import axios from 'axios';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        console.log(req.body);
        const woUrl = 'https://dev-raindog.pantheonsite.io/rest/node.json';
        // const room = await axios.post(woUrl, )

    }
}