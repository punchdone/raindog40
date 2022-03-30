import { Fragment } from 'react';

import classes from './RoomList.module.css';

function RoomList(props) {
    console.log(props.rooms);

    const roomList = props.rooms.map((room) => (
        <div className={classes.list}>
            <div>{room.roomName}</div>
            <div>{room.orderType}</div>
            <div>{room.orderTotal}</div>
        </div>
    ))
    
    return (
        <Fragment>
             <div className={classes.listBlock}>
                <div className={classes.header}>
                    <label htmlFor='roomName'>Room Name</label>
                    <label htmlFor='orderType'>Order Type</label>
                    <label htmlFor='orderTotal'>Order Total</label>
                </div>
                {roomList}
            </div>
        </Fragment>
    )
}

export default RoomList;