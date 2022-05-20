import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'papaparse';
import axios from 'axios';
import {
  Grid,
  FormControl,
  Button,
  FormHelperText,
  TextField
} from '@mui/material';

import DropZone from '../DropZone';
import { translationOE, finishTranslationOE } from '../../../helpers/Lookups';
import Pulldown from '../../../helpers/Pulldown';

function NewRoomForm(props) {
    const router = useRouter();

    const [showDropZone, setShowDropZone] = useState(false);
    const [header, setHeader] = useState([]);
    const [lines, setLines] = useState([]);
    const [room, setRoom] = useState({
        number: null,
        roomName: '',
        orderType: '',
        orderTotal: null,
        orderId: 0
    });

    // const roomNameInputRef = useRef();
    // const orderTypeInputRef = useRef();
    // const totalPriceInputRef = useRef();

    // const orderTypeOptions = (
    //     <select ref={orderTypeInputRef} defaultValue='1'>
    //         <option key='1' value='1'>Master</option>
    //         <option key='2' value='2'>ADD/JCO</option>
    //         <option key='3' value='3'>Blue/Warranty</option>
    //     </select>
    // );

    const dropFileHandler = (e) => {
        e.preventDefault();
        let lineEntryArray = [];
    
        Array.from(e.dataTransfer.files)
          //.filter((file) => file.type === "text/ord")
          .forEach(async (file) => {
            const text = await file.text();
            const nameLocation = text.indexOf("Name=");
            const descriptionLocation = text.indexOf("Description=");
            const poLocation = text.indexOf("PurchaseOrder=");
            const commentLocation = text.indexOf("Comment=");
            const customerLocation = text.indexOf("Customer=");
            const contactLocation = text.indexOf("Contact=");
            const baseDoorLocation = text.indexOf("BaseDoors=");
            const wallDoorLocation = text.indexOf("WallDoors=");
            const drawerFrontLocation = text.indexOf("DrawerFront=");
            const baseEndPanelLocation = text.indexOf("BaseEndPanels=");
            const hingeLocation = text.indexOf("HingeMaterials=");
            const guideLocation = text.indexOf("GuideMaterials=");
            const finishLocation = text.indexOf("ExteriorFinish=");
            const baseMaterialLocation = text.indexOf("BaseCabinetMaterials=");
            const wallMaterialLocation = text.indexOf("WallCabinetMaterials=");
    
            const projectNum = text.slice(
              nameLocation + 6,
              descriptionLocation - 3
            );
            const projectName = text.slice(
              descriptionLocation + 13,
              poLocation - 3
            );
            const poNum = text.slice(poLocation + 15, commentLocation - 3);
            const roomName = text.slice(commentLocation + 9, customerLocation - 3);
            const dealerName = text.slice(
              customerLocation + 10,
              contactLocation - 3
            );
            const details = text.slice(baseDoorLocation + 11, wallDoorLocation - 3);
            const doorEndLocation = details.indexOf(",") - 1;
            const doorStyle = details.slice(0, doorEndLocation);
            const drawerFrontLong = text.slice(
              drawerFrontLocation + 13,
              baseEndPanelLocation - 3
            );
            const drawerEndLocation = drawerFrontLong.indexOf(",") - 1;
            const drawerFront = drawerFrontLong.slice(0, drawerEndLocation);
            const hinge = await translationOE(text.slice(hingeLocation + 16, guideLocation - 3));
            const guide = await translationOE(text.slice(guideLocation + 16, finishLocation - 3));
            const materials = text.slice(
              baseMaterialLocation + 22,
              wallMaterialLocation - 3
            );
            const interiorLocation = text.slice(
              baseMaterialLocation + 22,
              wallMaterialLocation - 3).indexOf('/');
            const material = await translationOE(materials.slice(0,interiorLocation));
            const interior = await translationOE(materials.slice(interiorLocation + 1, wallMaterialLocation - 3));
            const finishLong = text.slice(finishLocation + 16);
            const finishEndLocation = finishLong.indexOf('"');
            const finish = await finishTranslationOE(finishLong.slice(0, finishEndLocation));
    
            setHeader({
              projectNum,
              projectName,
              poNum,
              roomName,
              dealerName,
              doorStyle,
              drawerFront,
              hinge,
              guide,
              material,
              interior,
              finish,
            });
    
            let startIndex = 0,
              index,
              indices = [];
            let newLine = {};
            while ((index = text.indexOf("[Cabinets]", startIndex)) > -1) {
              indices.push(index);
              startIndex = index + "[Cabinets]".length;
            }
            return indices.forEach((x, i) => {
              if (i > 0) {
                newLine = parse(text.slice(indices[i - 1] + 10, x)).data;
                newLine.shift();
                newLine.pop();
                setLines((prevState) => [...prevState, newLine]);
              }
            });
          });
      };

    const addRoomHandler = async (e) => {
        e.preventDefault();

        if (lines.length === 0) {
            alert('You need to attach a ORD file to complete this step!');
            return
        };

        // const enteredRoomName = roomNameInputRef.current.value;
        // const enteredOrderType = orderTypeInputRef.current.value;
        // const enteredTotalPrice = totalPriceInputRef.current.value;

        console.log('header', header);

        const newOrder = await axios.post('/api/projects/orders', header);
        const newOrderId = newOrder.data._id;
        console.log('newOrder = ' + newOrderId);

        let lineArray = [];
        lines.map((line) => {
            // console.log('comment = ' + line[0][8]);
            lineArray.push({
                "lineNum": line[0][0],
                "configCode": line[0][1],
                "quantity": line[0][7],
                "width": line[0][2],
                "height": line[0][3],
                "depth": line[0][4],
                "hinging": line[0][5],
                "ends": line[0][6],
                "comment": line[0][8]
            })
        });
        let lineEntryArray = [];
        lineArray.map(async (line) => {
          const lineResponse = await axios.post("/api/projects/orders/" + newOrderId + "/lines", line);
          lineEntryArray.push({ '_id': lineResponse.data._id });
        });

        // console.log(enteredRoomName);
        // console.log(enteredOrderType);
        // console.log(enteredTotalPrice);
        // console.log(newOrderId);

        // const roomData = {
        //     roomName: enteredRoomName,
        //     orderType: Number(enteredOrderType),
        //     orderTotal: Number(enteredTotalPrice),
        //     order: newOrderId
        // };

        // console.log(roomData);

        // await setRoom({
        //   ...room,
        //   ['orderId']: newOrderId});
        room.orderId = newOrderId;
        console.log(room);

        props.addRooms(room);
        setShowDropZone(false);
        setRoom({
            roomName: '',
            orderType: '',
            orderTotal: 0
        });
        setHeader([]);
        setLines([]);
    }

    const addOrderHandler = (e) => {
        e.preventDefault();
        setShowDropZone(!showDropZone);
    }

    // const nameChangeHandler = (e) => {
    //     setRoom(prevState => ({
    //         ...prevState, name: e.target.value
    //     }));
    // };

    // const totalChangeHandler = (e) => {
    //     console.log(e.target.value);
    //     setRoom(prevState => ({
    //         ...prevState,
    //         total: e.target.value
    //     }));
    // }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // console.log('name', name);
      // console.log('value', value);
      setRoom({
        ...room,
        [name]: value
      });
    };

    return (
        <Fragment>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl sx={{ width: '100%' }}>
              <TextField 
                id='room-name'
                name='roomName'
                label='Room Name'
                type='text'
                value={room.roomName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Pulldown
              area='orderType'
              areaTitle='Order Type'
              value={room.orderType}
              options={props.taxonomies}
              handleInputChange={handleInputChange}
              helperText='What kind or type of order is this?'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl sx={{ width: '100%' }}>
              <TextField
                id='order-total'
                name='orderTotal'
                label='Order Total'
                type='number'
                value={room.orderTotal}
                onChange={handleInputChange}
              />
              <FormHelperText>What is the dollar total for the order associated with this room/specification group?</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button variant='outlined' onClick={addOrderHandler}>Drop Ord File</Button>
            <Button variant='outlined' sx={{ mt: 1 }} disabled={lines.length === 0} onClick={addRoomHandler}>Add Room</Button>
          </Grid>
        {/* <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='roomName'>Room Name</label>
                <input type='text' required id='roomName' onChange={nameChangeHandler} value={room.name} ref={roomNameInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='orderType'>Order Type</label>
                {orderTypeOptions}
            </div>
            <div className={classes.control}>
                <label htmlFor='totalPrice'>Total Price</label>
                <input type='number' required id='totalPrice' onChange={totalChangeHandler} ref={totalPriceInputRef} value={room.total} />
            </div>

            <div className={classes.actions}>
                <button onClick={addOrderHandler}>Drop ORD</button>
                <button onClick={addRoomHandler}>+</button>
            </div>
        </form> */}
        {showDropZone && <DropZone onDrop={dropFileHandler} customer={header} lines={lines} />}
        </Fragment>
    )
};

export default NewRoomForm;