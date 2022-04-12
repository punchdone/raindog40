import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import channelCodeLookup from "../../helpers/channel";
import classes from './RoomItem.module.css';
import roomPad from '../../helpers/roomPad';
import orderType from '../../helpers/orderType';
import orderStatus from '../../helpers/orderStatus';
import OrderHeader from './orders/OrderHeader';

function RoomItem(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [channel, setChannel] = useState();
    const [order, setOrder] = useState([]);
    const [showOrder, setShowOrder] = useState(false);

    const project = props.project;

    useEffect(() => {
        fetchDetails(props.dealerCode);
    }, []);

    const fetchDetails = async (code) => {
        const order = await axios('/api/projects/orders/' + props.room.order);
        setOrder(order.data[0]);
        const channelCode = await channelCodeLookup(code);
        setChannel(channelCode);
        setIsLoading(false);
    };

    const handleClick = () => {
        setShowOrder(!showOrder);
    };

    
    return (
        <Fragment>
            {isLoading && <div>Loading...</div> ||
                <div className={classes.list}>
                    <div>{props.projectNum}-{roomPad(props.room.roomNum)}</div>
                    <div>{channel}-{props.projectName}</div>
                    <div>{props.room.roomName}</div>
                    <div>{orderType(props.room.orderType)}</div>
                    <div>{orderStatus(props.room.status)}</div>
                    <div>Product Line</div>
                    <div>{props.room.order}</div>
                    <div><button onClick={handleClick}>Order Details</button></div>
                </div>
            }
            {showOrder && <OrderHeader projectNum={props.projectNum + '-' + roomPad(props.room.roomNum)} order={order} />}
        </Fragment>
    )
};

export default RoomItem;