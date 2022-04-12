import { Fragment } from 'react';

import classes from './RoomList.module.css';
import orderType from '../../../helpers/orderType';
import roomPad from '../../../helpers/roomPad';

function RoomList(props) {

    console.log(props.rooms);

    const rooms = props.rooms;

    let sum = 0;
    for (let index = 0; index < props.rooms.length; index++) {
        sum += props.rooms[index].orderTotal;
    }

    const roomList = props.rooms.length === 0 &&
        <div className={classes.list}>No rooms (yet)</div> ||
        props.rooms.map((room) => (
            <div className={classes.list} key={room.roomNum}>
                <div>{roomPad(room.roomNum)}</div>
                <div>{room.roomName}</div>
                <div>{orderType(room.orderType)}</div>
                <div><input type='checkbox' checked={room.order} /></div>
                <div>{(room.orderTotal).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}</div>
            </div>
    ))
    
    return (
        <Fragment>
             <div className={classes.listBlock}>
                <div className={classes.header}>
                    <label htmlFor='roomNum'>Room #</label>
                    <label htmlFor='roomName'>Room Name</label>
                    <label htmlFor='orderType'>Order Type</label>
                    <label htmlFor='order'>Order</label>
                    <label htmlFor='orderTotal'>Order Total</label>
                </div>
                {roomList}
                <div className={classes.total}>Order Total = {(sum).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}</div>
            </div>
        </Fragment>
    )
}

export default RoomList;