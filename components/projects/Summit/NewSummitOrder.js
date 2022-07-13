import { useEffect, useState } from 'react';
import axios from 'axios';

function NewSummitOrder(props) {
    const [lines, setLines] = useState([]);

    console.log(props.room);

    // useEffect(() => {
    //     fetchOrderDetails(props.room.order);
    // }, []);

    async function fetchOrderDetails(orderNum) {
        const orderDetails = await axios("https://dev-raindog.pantheonsite.io/rest/entity_commerce_order/" +
        orderNum +
        ".json");
        // console.log(orderDetails);
        const lines = orderDetails.data.commerce_line_items.und;
        console.log(lines);
        lines.map(async(line) => {
            console.log(line.line_item_id);
            const lineDetail = await axios("https://dev-raindog.pantheonsite.io/rest/entity_commerce_line_item/" + line.line_item_id + ".json");
            console.log(lineDetail.data);
            setLines((prevState) => [...prevState, lineDetail.data]);
        });
    };

    const lineDetails = 
        lines.map((line) => (
            <div key={line.line_item_id}>
                <div>item: {line.line_item_label}  quantity: {line.quantity}</div>
            </div>
        ));

    return (
        <div>
            <hr />
            <h3>Order Details</h3>
            <div>Order#: {props.room.orderRaindogId}</div>
            <div>Product Line: {props.room.productLine}</div>
            <div>Material: {props.room.material}</div>
            <div>Construction {props.room.construction}</div>
            <div>Interior: {props.room.interior}</div>
            <div>Drawer Type: {props.room.drawerType}</div>
            <div>Hinging: {props.room.hinging}</div>
            <div>Guides: {props.room.guides}</div>
            <hr />
            <div>Door Type: {props.room.doorType}</div>
            <div>Door Style: {props.room.doorStyle}</div>
            <div>Door Construction: {props.room.doorConstruction}</div>
            <div>Stile/Rail Size: {props.room.railSize}</div>
            <div>OE Profile: {props.room.oeProfile}</div>
            <div>IE Profile: {props.room.ieProfile}</div>
            <div>Panel Profile: {props.room.panelProfile}</div>
            <div>Top Drawer: {props.room.topDrawerType}</div>
            <hr />
            <div>Finish: {props.room.finish}</div>
            <div>Finish Type: {props.room.finishType}</div>
            <hr />
            <h3>Items</h3>
            <div>{lineDetails}</div>
            <hr />
            {/* {!props.rooms.lines && 'Nothing to see here!' ||
                props.room.lines.map((line) => (
                    <div>line.label</div>
                ))} */}
            {/* {room.lines.map((line) => (
                <div>{line.line_item_label}</div>
            ))} */}
        </div>

    )
};

export default NewSummitOrder;