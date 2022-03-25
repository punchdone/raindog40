import axios from 'axios';
axios.defaults.withCredentials = true;

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const tokenFetch = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/token.json')
        const token = tokenFetch.data.token;
        console.log('token = ' + token);

        const userInfo = { "username": "sreader", "password": "rudy4joy" };
        const project = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/login.json', userInfo);
        const sessionId = project.data.sessid;
        console.log('sessionId = ' + sessionId);

        console.log(req.body);

        const woUrl = 'https://dev-raindog.pantheonsite.io/rest/node.json';
       
        const projects = await fetch(woUrl, {
            method: "POST",
            body: JSON.stringify({
                "type": "wo_projects",
                "title_field": {
                    "und": [
                        {"value": req.body.title}
                    ]
                } 
            }),
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": `${token}`,
                "Cookie": `${sessionId}`
            },
            withCredentials: true
        });
        const projectsData = await projects.json();
        console.log(projectsData);

        return res.status(200).json(projectsData);
    } else {

        // const tokenFetch = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/token.json')
        // const token = tokenFetch.data.token;
        // // console.log('token = ' + token);

        // const userInfo = { "username": "sreader", "password": "rudy4joy" };
        // const user = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/login.json', userInfo);
        // const sessionId = user.data.sessid;
        // console.log('sessionId = ' + sessionId);

        const projectsUrl = 'https://dev-raindog.pantheonsite.io/rest/node.json';
        const projects = await fetch(projectsUrl);
        const projectsData = await projects.json();
        // console.log(projectsData);

        return res.status(200).json(projectsData);
    };
}