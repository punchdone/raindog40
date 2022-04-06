import axios from 'axios';

export default async function channelCode(index) {
    const channel = await axios('https:/live-raindog.pantheonsite.io/api/channel/' + index);
    // console.log(channel.data);
    // console.log(channel.data[0].code);
    return channel.data[0].code;
}