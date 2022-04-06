import { Fragment, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import classes from './NewSummitForm.module.css';
import channelCode from '../../helpers/channel';

function NewSummitForm() {
    const router = useRouter();
    const [proposal, setProposal] = useState([]);

    const proposalNumInputRef = useRef();

    const raindogHandler = async(e) => {
        e.preventDefault();
        const proposalNum = proposalNumInputRef.current.value;
        console.log('Proposal# = ' + proposalNum);
        // setProposal((prevState) => [...prevState, proposalNum ]);

        const proposalData = await axios('/api/projects/raindog/proposals/' + proposalNum);
        console.log(proposalData.data);
        const nid = proposalData.data.nid;
        const projectName = proposalData.data.title;
        const channelCode = proposalData.data.field_project_channel.und[0].target_id;
        const repCode = proposalData.data.field_project_rw_rep.und[0].target_id;
        const designerCode = proposalData.data.field_project_designer.und; 
        // && null || proposalData.data.field_project_designer.und[0].target_id;
        const rooms = proposalData.data.field_project_rooms2.und;
        // setProposal((prevState) => [...prevState, proposalData.data])

        console.log(projectName);
        console.log(channelCode);
        console.log(repCode);
        console.log(designerCode);
        console.log(rooms);
        console.log('length = ' + rooms.length);

        const proposalNutt = {
            nid,
            proposalNum,
            dealerCode: channelCode,
            projectName,
            productLine: 1
        };

        const newProject = await axios.post('/api/projects', proposalNutt);
        const newProjectId = newProject.data._id;
        console.log('newProjectId = ' + newProjectId);

        if (rooms.length === 0) {
            alert('This proposal has no rooms!');
            return
        };

        let roomArray = [];
        rooms.map(async(room) => {
            console.log('room nid = ' + room.target_id);
            const roomDetail = await axios('/api/projects/raindog/proposals/rooms/' + room.target_id);
            console.log(roomDetail.data);
            const roomNum = roomDetail.data.field_room_number.und[0].value;
            const roomName = roomDetail.data.title;
            const orderType = roomDetail.data.field_order_type.und[0].tid;
            const status = roomDetail.data.field_room_status.und[0].value;
            const orderRaindogId = roomDetail.data.field_order.und[0].target_id;

            const orderRaindogDetail = await axios('https://dev-raindog.pantheonsite.io/rest/entity_commerce_order/' + orderRaindogId + '.json');
            console.log(orderRaindogDetail.data);
            const lines = orderRaindogDetail.data.commerce_line_items.und;
            console.log(lines);
            lines.map(async(line) => {
                const lineDetail = axios('')
            })
            // const orderLinesRaindog = await axios('https://dev-raindog.pantheonsite.io/rest/entity_commerce_line_item/256858.json')
            
            const roomNutt = {
                roomNum,
                roomName,
                orderType,
                status,
                // order
            }
            console.log(roomNutt);

            const newRoom = await axios.post('/api/projects/' + newProjectId +'/rooms', roomNutt);
            console.log(newRoom.data);
            

        });
    }

    const proposalHeader = (
        <div>
            <label>Proposal#</label>
            <div></div>
        </div>
    )

    return (
        <Fragment>
            <h2>This is the Summit form.</h2>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='proposalNum'>Proposal#</label>
                    <input type='text' required id='proposalNum' ref={proposalNumInputRef} />
                </div>
                <div className={classes.actions} onClick={raindogHandler}>
                    <button>Pull Raindog Detail</button>
                </div>
            </form>
            <div>
               {proposal}
            </div>
        </Fragment>
    )
};

export default NewSummitForm;