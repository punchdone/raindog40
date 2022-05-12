import { TableRow, TableCell, Button } from '@mui/material';

const RateItem = (props) => {
    const uomTitle = props.uoms.filter(uom => uom._id === props.rate.uom);
    return (
        <TableRow>
            <TableCell>{props.rate.rate}</TableCell>
            <TableCell>{uomTitle[0].title}</TableCell>
            <TableCell>
                <Button variant='outlined'>Edit</Button>
                <Button variant='outlined'>Delete</Button>
            </TableCell>
        </TableRow>
    )
};

export default RateItem;