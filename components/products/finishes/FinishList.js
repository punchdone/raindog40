import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

import FinishItem from './FinishItem';


const FinishList = (props) => {
    console.log('finishes', props.finishes)
    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxheight: 440 }}>
                    <Table sx={{ minWidth: 200 }} aria-label='Finish List'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Finish Name</TableCell>
                                <TableCell>Finish Type</TableCell>
                                <TableCell>Stocking Level</TableCell>
                                <TableCell>Summit</TableCell>
                                <TableCell>WB/DB</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.finishes.map((finish) => (
                                <FinishItem key={finish._id} finish={finish} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
};

export default FinishList;