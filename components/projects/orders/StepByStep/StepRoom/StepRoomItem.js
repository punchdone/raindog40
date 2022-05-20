import { Fragment } from 'react';
import {
    TableRow,
    TableCell,
    Button
} from '@mui/material';

const StepRoomItem = ({ room }) => {
    console.log(room);
    return (
        <Fragment>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>{room}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <Button variant='outlined' size='small'>Order</Button>
                    <Button variant='outlined' size='small'>Edit</Button>
                    <Button variant='outlined' size='small'>Delete</Button>
                </TableCell>
            </TableRow>
        </Fragment>
    )
};

export default StepRoomItem;