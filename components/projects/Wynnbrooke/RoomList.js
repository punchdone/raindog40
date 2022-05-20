// import { Fragment } from 'react';
import {
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

// import classes from './RoomList.module.css';
// import orderType from '../../../helpers/orderType';
// import roomPad from '../../../helpers/NumPad';
import RoomItem from './RoomItem';

function RoomList({ rooms }) {
    // console.log('rooms', rooms);

    // console.log(props.rooms);

    // const rooms = props.rooms;

    let sum = 0;
    for (let index = 0; index < rooms.length; index++) {
        sum += rooms[index].orderTotal;
    }

    // const roomList = props.rooms.length === 0 &&
    //     <div className={classes.list}>No rooms (yet)</div> ||
    //     props.rooms.map((room) => (
    //         <div className={classes.list} key={room.roomNum}>
    //             <div>{roomPad(room.roomNum)}</div>
    //             <div>{room.roomName}</div>
    //             <div>{orderType(room.orderType)}</div>
    //             <div><input type='checkbox' checked={room.order} /></div>
    //             <div>{(room.orderTotal).toLocaleString('en-US', {
    //                 style: 'currency',
    //                 currency: 'USD'
    //             })}</div>
    //         </div>
    // ))
    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table aria-label='room list' stickyheader='true'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room#</TableCell>
                            <TableCell>Room/Spec Group Name</TableCell>
                            <TableCell>Order Type</TableCell>
                            <TableCell>Order#</TableCell>
                            <TableCell>Order Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.length === 0 && (
                            <TableRow>
                                <TableCell>No rooms included.</TableCell>
                            </TableRow>
                        ) ||
                            rooms.map((room) => (
                                <RoomItem key={room.roomNum} room={room} />
                            ))
                        }
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Order Total</TableCell>
                            <TableCell>
                                {(sum).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>

        // <Fragment>
        //      <div className={classes.listBlock}>
        //         <div className={classes.header}>
        //             <label htmlFor='roomNum'>Room #</label>
        //             <label htmlFor='roomName'>Room Name</label>
        //             <label htmlFor='orderType'>Order Type</label>
        //             <label htmlFor='order'>Order</label>
        //             <label htmlFor='orderTotal'>Order Total</label>
        //         </div>
        //         {roomList}
        //         <div className={classes.total}>Order Total = {(sum).toLocaleString('en-US', {
        //             style: 'currency',
        //             currency: 'USD'
        //         })}</div>
        //     </div>
        // </Fragment>
    )
}

export default RoomList;