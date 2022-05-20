import { useEffect, useState } from 'react';
import {
    TableRow,
    TableCell
} from '@mui/material';
import axios from 'axios';

import { RoomPad } from '../../../helpers/NumPad';
// import { taxonomyLookup } from '../../../helpers/Lookups';
import Spinner from '../../layout/spinner';

const RoomItem = ({ room }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderType, setOrderType] = useState();

    // console.log('room', room);

    useEffect(() => {
        fetchHandler(room.orderType);
    }, []);

    const fetchHandler = async(orderType) => {
        const orderRes = await axios('/api/taxonomy/' + orderType);
        // console.log(orderRes.data.title);
        setOrderType(orderRes.data.title);
        setIsLoading(false);
    };

    console.log(room);
    return (
        isLoading && <Spinner /> ||
        <TableRow>
            <TableCell>{RoomPad(room.roomNum)}</TableCell>
            <TableCell>{room.roomName}</TableCell>
            <TableCell>{orderType}</TableCell>
            <TableCell>{room.orderId}</TableCell>
            <TableCell>{room.orderTotal}</TableCell>
        </TableRow>
    )
};

export default RoomItem;