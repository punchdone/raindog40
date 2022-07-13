import axios from 'axios'

async function handler(req, res) {
    const nid = req.query.nodeId;
    
    const projectUrl = 'https://dev-raindog.pantheonsite.io/rest/node/' + nid + '.json';
    // console.log(projectUrl);
    const project = await axios(projectUrl);
    console.log(project);

    return res.status(200).json(project.data);

};

export default handler;