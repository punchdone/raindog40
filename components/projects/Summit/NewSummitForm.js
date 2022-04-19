import { Fragment, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import classes from "./NewSummitForm.module.css";
import NewSummitRoom from './NewSummitRoom';
import channelCodeLookup from "../../../helpers/channel";
import roomPad from '../../../helpers/roomPad';
import orderStatus from '../../../helpers/orderStatus';
import taxonomyLookup from '../../../helpers/Lookups';

function NewSummitForm() {
  const router = useRouter();
  const [proposal, setProposal] = useState({});
  const [rooms, setRooms] = useState([]);
  
  const proposalNumInputRef = useRef();

  let projectId = '';

  const raindogHandler = async (e) => {
    e.preventDefault();
    const proposalNum = proposalNumInputRef.current.value;
    console.log("Proposal# = " + proposalNum);
    // setProposal((prevState) => [...prevState, proposalNum ]);

    const proposalData = await axios(
      "/api/projects/raindog/proposals/" + proposalNum
    );
    console.log(proposalData.data);
    const nid = proposalData.data.nid;
    const projectName = proposalData.data.title;
    const channelCode =
      proposalData.data.field_project_channel.und[0].target_id;
    const repCode = proposalData.data.field_project_rw_rep.und[0].target_id;
    const designerCode = proposalData.data.field_project_designer.und;
    // && null || proposalData.data.field_project_designer.und[0].target_id;
    const rooms = proposalData.data.field_project_rooms2.und;
    const channelTitle = await channelCodeLookup(channelCode);
    // setProposal((prevState) => [...prevState, proposalData.data])

    console.log(projectName);
    console.log(channelCode);
    console.log(channelTitle);
    console.log(repCode);
    console.log(designerCode);
    console.log(rooms);
    console.log("length = " + rooms.length);

    // const proposalNutt = {
    //     nid,
    //     proposalNum,
    //     dealerCode: channelCode,
    //     projectName
    // };
    // console.log(proposalNutt);

    setProposal({ nid, proposalNum, dealerCode: channelCode, channelTitle, projectName });

    // const newProject = await axios.post("/api/projects", proposalNutt);
    // const newProjectId = newProject.data._id;
    // console.log("newProjectId = " + newProjectId);

    if (rooms.length === 0) {
      alert("This proposal has no rooms!");
      return;
    }

    rooms.map(async (room) => {
      // console.log("room nid = " + room.target_id);
      const roomDetail = await axios(
        "/api/projects/raindog/proposals/rooms/" + room.target_id
      );
      // console.log(roomDetail.data);
      const roomNid = roomDetail.data.nid;
      const roomNum = Number(roomDetail.data.field_room_number.und[0].value);
      // console.log('roomNum = ' + roomNum);
      const padRoomNum = roomPad(roomDetail.data.field_room_number.und[0].value);
      const roomName = roomDetail.data.title;
      const orderType = roomDetail.data.field_order_type.und[0].tid;
      const status = roomDetail.data.field_room_status.und[0].value;
      const orderTypeTitle = await taxonomyLookup(roomDetail.data.field_order_type.und[0].tid);
      const statusTitle = orderStatus(roomDetail.data.field_room_status.und[0].value);
      const checked = false;
      const orderRaindogId = roomDetail.data.field_order.und[0].target_id;

      const orderRaindogDetail = await axios(
        "https://dev-raindog.pantheonsite.io/rest/entity_commerce_order/" +
          orderRaindogId +
          ".json"
      );
      console.log(orderRaindogDetail.data);
      const material =
        orderRaindogDetail.data.field_order_wood_species.und[0].tid;
      const construction =
        orderRaindogDetail.data.field_case_construction.und[0].tid;
      const interior = orderRaindogDetail.data.field_order_interior.und[0].tid;
      const drawerType = orderRaindogDetail.data.field_drawer_type.und[0].tid;
      const hinging = orderRaindogDetail.data.field_hinging.und[0].tid;
      const guides = orderRaindogDetail.data.field_guides.und[0].tid;
      const doorType = orderRaindogDetail.data.field_order_door_type.und[0].tid;
      const doorStyle =
        orderRaindogDetail.data.field_order_door_style.und[0].tid;
      const doorConstruction =
        orderRaindogDetail.data.field_door_construction.und[0].tid;
      const railSize = orderRaindogDetail.data.field_door_rail_size.und[0].tid;
      const topDrawerType =
        orderRaindogDetail.data.field_door_top_drawer.und[0].value;
      const oeProfile =
        orderRaindogDetail.data.field_outside_edge.und[0].target_id;
      const ieProfile =
        orderRaindogDetail.data.field_inside_edge.und[0].target_id;
      const panelProfile = orderRaindogDetail.data.field_panel.und[0].target_id;
      const finish =
        orderRaindogDetail.data.field_finish_color.und[0].target_id;
      const finishType = orderRaindogDetail.data.field_finish_type.und[0].tid;
      const productLine = orderRaindogDetail.data.field_product_line.und[0].tid;
      // const lines = orderRaindogDetail.data.commerce_line_items.und;
      setRooms((prevState) => [
        ...prevState,
        {
          roomNid,
          roomNum,
          padRoomNum,
          roomName,
          orderType,
          status,
          orderTypeTitle,
          statusTitle,
          checked,
          orderRaindogId,
          productLine,
          material,
          construction,
          interior,
          drawerType,
          hinging,
          guides,
          doorType,
          doorStyle,
          doorConstruction,
          railSize,
          topDrawerType,
          oeProfile,
          ieProfile,
          panelProfile,
          finish,
          finishType,
        },
      ]);
      // console.log(lines);
      // let lineArray = [];
      // lines.map(async (line) => {
      //   console.log(line);
      //   console.log(line.line_item_id);
      //   const lineDetail = await axios(
      //     "https://dev-raindog.pantheonsite.io/rest/entity_commerce_line_item/" +
      //       line.line_item_id +
      //       ".json"
      //   );
      //   console.log(lineDetail.data);
      //   await lineArray.push(lineDetail.data);
      // });

      // console.log(lineArray);
      // setRooms((prevState) => {
      //   return [{ lines: lineArray }, ...prevState]
      // });

      // const orderLinesRaindog = await axios('https://dev-raindog.pantheonsite.io/rest/entity_commerce_line_item/256858.json')

    //   const roomNutt = {
    //     roomNum,
    //     roomName,
    //     orderType,
    //     status,
    //   };
    //   console.log(roomNutt);

    //   const newRoom = await axios.post(
    //     "/api/projects/" + newProjectId + "/rooms",
    //     roomNutt
    //   );
    //   console.log(newRoom.data);
    });
  };

  const checkboxHandler = (nid, value) => {
    console.log('roomId = ' + nid);
    console.log('checked = ' + value);
    let updatedRooms = rooms.map(room => {
      if (room.roomNid === nid) {
        return {...room, checked: value}
      }
      return room;
    });
    console.log(updatedRooms);
    setRooms(updatedRooms);
    // setRooms(prevState => ({
    //   rooms: prevState.rooms.map(room => (
    //     room.roomNum === nid? { ...room, checked: value }: room
    //   ))
    // }))
  };

  const createWorkOrderHandler = async(e) => {
    e.preventDefault();
    // console.log(proposal.proposalNum);
    const existingProject = await axios('/api/projects/' + proposal.proposalNum);
    // console.log(existingProject);
    if (existingProject.data.length === 0) {
      const newWorkOrder = await axios.post('/api/projects/raindog', { 'title': proposal.channelTitle + '-' + proposal.projectName })
      const newWODetail = await axios('/api/projects/raindog/' + newWorkOrder.data.nid);
      // console.log(newWODetail.data.field_wo_project_num.und[0].value);
      proposal.woProjectNum = newWODetail.data.field_wo_project_num.und[0].value;
      const newProject = await axios.post('/api/projects', proposal);
      // console.log(newProject);
      projectId = newProject.data._id;
    } else {
      projectId = existingProject.data[0]._id;
      console.log('Project already exists! And, your project ID is ' + projectId);
    }
    rooms.map(async(room) => {
      // console.log(room);
      if (room.checked) {
        // console.log(projectId);
        // console.log(room);
        const newOrder = await axios.post('/api/projects/orders', room);
        const newOrderId = newOrder.data._id;
        // console.log(newOrderId);
        room.order = newOrderId;
        const roomResponse = await axios.post('/api/projects/' + projectId + '/rooms', room);
        // console.log(roomResponse);
        const raindogOrder = await axios("https://dev-raindog.pantheonsite.io/rest/entity_commerce_order/" + room.orderRaindogId + ".json");
        const lines = raindogOrder.data.commerce_line_items.und;
        lines.map(async(line) => {
          const lineDetail = await axios("https://dev-raindog.pantheonsite.io/rest/entity_commerce_line_item/" + line.line_item_id + ".json");
          // console.log(lineDetail.data);
          const ld = lineDetail.data;

          const hinging = ld.field_hinge_swing;
          // console.log('hinging = ' + hinging);
          const comment =ld.field_product_notes;
          // console.log('comment = ' + comment);
          const width = ld.field_width;
          const height = ld.field_height;
          const depth = ld.field_depth;
          const ends = 'UN - UN';
          // ld.field_left_end.und[0].tid + '-' + ld.field_right_end.und[0].tid

          const lineNutt = {
            lineNum: ld.field_line_item_num,
            type: ld.type,
            configCode: ld.line_item_label,
            quantity: ld.quantity,
            width,
            height,
            depth,
            hinging,
            ends,
            comment: comment,
            raindogLineItemId: ld.line_item_id
          };
          const newLine = await axios.post('/api/projects/orders/' + newOrderId + '/lines', lineNutt);
          // console.log(newLine);

          // router.push('/projects');
        })
      }
    })
  }

  const projectRaindogDetails = (
    <div>
      <h3>Project Details</h3>
      <div>Raindog#: {proposal.nid}</div>
      <div>Proposal#: {proposal.proposalNum}</div>
      <div>Channel: {proposal.channelTitle}</div>
      <div>Project Name: {proposal.projectName}</div>
      <hr />
    </div>
  );

//   const orderLines = (
//       <div>{console.log(rooms.lines)}</div>
//   );

    const roomBlock = (
      <div className={classes.listBlock}>
        <div className={classes.header}>
          <label htmlFor='roomNum'>Room#</label>
          <label htmlFor='roomName'>Room Name</label>
          <label htmlFor='status'>Status</label>
          <label htmlFor='orderType'>Order Type</label>
          <label htmlFor="order">Order #</label>
          <label>WO Select</label>
          <label></label>
        </div>
      </div>
    )

    const sortedRooms = rooms.sort((a,b) => {
      a.roomNum - b.roomNum
    });

  const roomList = sortedRooms.map((room) => (
    <div key={room.roomNum}>
      <NewSummitRoom room={room} checkAction={checkboxHandler} />
    </div>
  ));

  return (
    <Fragment>
      <h2>This is the Summit form.</h2>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="proposalNum">Proposal#</label>
          <input
            type="text"
            required
            id="proposalNum"
            ref={proposalNumInputRef}
          />
        </div>
        <div className={classes.actions} onClick={raindogHandler}>
          <button>Pull Raindog Detail</button>
        </div>
        {proposal.nid &&
        <div className={classes.actions} onClick={createWorkOrderHandler}>
          <button>Create Workorders</button>
        </div>}
      </form>
      {proposal.nid && projectRaindogDetails}
      {proposal.nid && roomBlock}
      {proposal.nid && roomList}
    </Fragment>
  );
}

export default NewSummitForm;
