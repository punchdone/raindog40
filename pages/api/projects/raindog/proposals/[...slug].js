import axios from 'axios';

async function handler(req, res) {
    const proposalId = req.query.slug[0];
    const proposalUrl = 'https://dev-raindog.pantheonsite.io/api/proposals/' + proposalId;
    const proposal = await axios(proposalUrl);
    // console.log(proposal.data);
    const proposalNid = proposal.data[0].nid;
    // console.log(proposalNid);
    const raindogUrl = 'https://dev-raindog.pantheonsite.io/rest/node/' + proposalNid +'.json';
    const raindog = await axios(raindogUrl);
    // const proposalNid = proposal.data
    // console.log(raindog.data);
    return res.status(200).json(raindog.data);
};

export default handler;