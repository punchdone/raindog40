import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

import StepRoomItem from './StepRoomItem';

const StepRoomList = ({ rooms }) => {
    console.log(rooms);
    return (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxheight: 440 }}>
                    <Table sx={{ minWidth: 200 }} aria-label='Finish List'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Room#</TableCell>
                                <TableCell>Room Name</TableCell>
                                <TableCell>Order Status</TableCell>
                                <TableCell>Order Type</TableCell>
                                <TableCell>Order#</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.map((room) => (
                                <StepRoomItem key={room.roomNum} room={room} />
                            ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    
    )
};

export default StepRoomList;