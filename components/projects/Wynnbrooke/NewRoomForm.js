import { useRef, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { parse } from 'papaparse';
import axios from 'axios';

import classes from './NewRoomForm.module.css';
import DropZone from '../DropZone';

function NewRoomForm(props) {
    const router = useRouter();

    const [showDropZone, setShowDropZone] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [lines, setLines] = useState([]);
    const [room, setRoom] = useState({
        number: null,
        name: '',
        type: 1,
        total: null
    });

    const roomNameInputRef = useRef();
    const orderTypeInputRef = useRef();
    const totalPriceInputRef = useRef();

    const orderTypeOptions = (
        <select ref={orderTypeInputRef} defaultValue='1'>
            <option key='1' value='1'>Master</option>
            <option key='2' value='2'>ADD/JCO</option>
            <option key='3' value='3'>Blue/Warranty</option>
        </select>
    );

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
            const hinge = text.slice(hingeLocation + 16, guideLocation - 3);
            const guide = text.slice(guideLocation + 16, finishLocation - 3);
            const material = text.slice(
              baseMaterialLocation + 22,
              wallMaterialLocation - 3
            );
            const finishLong = text.slice(finishLocation + 16);
            const finishEndLocation = finishLong.indexOf('"');
            const finish = finishLong.slice(0, finishEndLocation);
    
            setCustomer({
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

        const enteredRoomName = roomNameInputRef.current.value;
        const enteredOrderType = orderTypeInputRef.current.value;
        const enteredTotalPrice = totalPriceInputRef.current.value;

        const newOrder = await axios.post('/api/projects/orders', customer);
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

        console.log(enteredRoomName);
        console.log(enteredOrderType);
        console.log(enteredTotalPrice);
        console.log(newOrderId);

        const roomData = {
            roomName: enteredRoomName,
            orderType: Number(enteredOrderType),
            orderTotal: Number(enteredTotalPrice),
            order: newOrderId
        };

        console.log(roomData);

        props.addRooms(roomData);
        setShowDropZone(false);
        setRoom({
            name: '',
            type: 1,
            total: 0
        });
        setCustomer([]);
        setLines([]);
    }

    const addOrderHandler = (e) => {
        e.preventDefault();
        setShowDropZone(!showDropZone);
    }

    const nameChangeHandler = (e) => {
        setRoom(prevState => ({
            ...prevState, name: e.target.value
        }));
    };

    const totalChangeHandler = (e) => {
        console.log(e.target.value);
        setRoom(prevState => ({
            ...prevState,
            total: e.target.value
        }));
    }

    return (
        <Fragment>
        <form className={classes.form}>
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
        </form>
        {showDropZone && <DropZone onDrop={dropFileHandler} customer={customer} lines={lines} />}
        </Fragment>
    )
};

export default NewRoomForm;