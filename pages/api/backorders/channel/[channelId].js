import { MongoClient } from 'mongodb';

async function handler(req, res) {

    const channelId = req.query;

    console.log(channelId);
    
    const client = await MongoClient.connect('mongodb+srv://rw_user:wood2good@cluster0.gooul.mongodb.net/backorders?retryWrites=true&w=majority');

    const db = client.db();

    const backorderCollection = db.collection('raindog');

    const backorders = await backorderCollection.find({ channel: channelId.channelId }).toArray();

    client.close();

    res.status(200).json(backorders);
}

export default handler;