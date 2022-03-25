import { Fragment, useEffect, useState } from 'react';
// import Head from 'next/head';
// import MongoClient from 'mongodb/lib/mongo_client';
// import { useSession } from "next-auth/client";

import BackorderList from '../../components/backorders/BackorderList';

function BackorderPage(props) {
    const [backorders, setBackorders] = useState([]);

    // const [session] = useSession();
    // const role = session?.user.role;
    // const channel = session?.user.channel;

    // console.log('role = ' + role);
    // console.log('channel = ' + channel);

    useEffect(() => {
    //     backorderHandler(role, channel);
    // }, [role, channel]);
        backorderHandler();
    }, []);

    // const backorderHandler = async (role, channel, received, shipped) => {
        const backorderHandler = async () => {
        // console.log('backorderHandler role = ' + role);
        // console.log('backorderHandler channel = ' + channel);
        // if (role === '621ec1c5b9068d5a5df7e859') {
        //     console.log('you are here!')
        //     fetchChannelOrders(channel);
        //     return;
        // }
        // console.log('another thing');
        fetchAllOrders();
    };

    async function fetchChannelOrders(channel) {
        const backorderUrl = '/api/backorders/channel/' + channel;
            // console.log(backorderUrl);
            const backorderResult = await fetch(backorderUrl);
            const backorderData = await backorderResult.json();
            // console.log('backorderData = ');
            // console.log(backorderData);
            setBackorders(backorderData);
            // console.log(backorders);
    };

    async function fetchAllOrders() {
        const backorderResult = await fetch('api/backorders');
        const backorderData = await backorderResult.json();
        // console.log(backorderData);
        setBackorders(backorderData);
    };

    const filterHandler = (e) => {
        e.preventDefault();
        console.log(e.target.received.value);
        console.log(e.target.shipped.value);
        if (e.target.received.value && !e.target.shipped.value) {
            setBackorders(
                backorders.filter(backorder => !backorder.Received)
            );
        } else if (!e.target.received.value && e.target.shipped.value) {
            setBackorders(
                backorders.filter(backorder => !backorder.Shipped)
            );
        } else if (e.target.received.value && e.target.shipped.value) {
            setBackorders(
                backorders.filter(backorder => !backorder.Received && !backorder.Shipped)
            )
        };
        // if (e.target.received.value) {
        //     setBackorders(
        //         backorders.filter(backorder => backorder.Shipped.length > 0)
        //     )
        // };
    };

            //     
            // } 
                // async function fetchBackorders() {
                   
                // }
            
        // }
    // async function fetchBackorders(channel, role) {
    //     const backorderResult = await fetch('https://live-raindog.pantheonsite.io/api/channel');
    //     const backorderData = await channelResult.json();
    //         setChannels(channelData);
    //         console.log(channels);
    // };

    // const pageContent = (
    //     <Fragment>
    //         <Head>
    //             <title>Backorder List</title>
    //             <meta
    //                 name='description'
    //                 content='Comprehensive list of backorders'
    //             />
    //         </Head>
    //         <BackorderList backorders={backorders} />
    //     </Fragment>
    // );

    return (
        <div>
        {/* { session && ( */}
        <Fragment>
            {/* <div><h3>{session?.user.name}</h3></div> */}
            <BackorderList backorders={backorders} onFilter={filterHandler} />
        </Fragment> ) || <p>Not authorized!</p>
        {/* } */}
        </div>
    )
};

// export async function getStaticProps() {
//     // const [session] = useSession();
//     // const role = session?.user.role;
//     // const channel = session?.user.channel;

//     console.log('role = ' + role);
//     console.log('channel = ' + channel);

//     const client = await MongoClient.connect('mongodb+srv://rw_user:wood2good@cluster0.gooul.mongodb.net/backorders?retryWrites=true&w=majority');

//     const db = client.db();

//     const backorderCollection = db.collection('raindog');

//     if (role === '621ec1c5b9068d5a5df7e859') {
//         const backorders = await backorderCollection.find({ role: role }).toArray();
//     } else {
//         const backorders = await backorderCollection.find().toArray();
//     };
    

//     client.close();

//     return {
//         props: {
//             backorders: backorders.map((backorder) => ({
//                 id: backorder._id.toString(),
//                 date: backorder.Date,
//                 po: backorder.PO,
//                 // channel: null,
//                     // backorder.Channel === undefined && null || backorder.channel,
//                 name: backorder.Name,
//                 item: backorder.Item,
//                 quantity: backorder.Qty,
//                 shipped: backorder.Shipped,
//                 received: backorder.Received,
//                 notes: backorder.Notes
//             })),
//         },
//         revalidate: 1,
//     };
// }

export default BackorderPage;