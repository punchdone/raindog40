import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import TablePagination from '@mui/material/TablePagination';

// import Card from '../../ui/Card';
// import classes from './DimensionTable.module.css';
// import DimensionItem from './DimensionItem';
import DimensionForm from './DimensionForm';
import DimensionItem from './DimensionItem';

function DimensionTable(props) {

    const dimensions = props.dimensions;

    const addDimensionHandler = (dimension) => {
        props.loadDimension(dimension);
    };

    let dimensionLines = !dimensions && 'No dimensions provided (yet).' ||
        dimensions.map((dimension) => (
                <DimensionItem key={dimension.direction} dimension={dimension} deleteDimension={props.deleteDimension} />
        ));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxheight: 440 }}>
                <Table sx={{ minWidth: 200 }} aria-label="dimension list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Direction</TableCell>
                            <TableCell>Standard</TableCell>
                            <TableCell>Minimum</TableCell>
                            <TableCell>Maximum</TableCell>
                            <TableCell>Fixed</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dimensionLines}
                        <DimensionForm addDimension={addDimensionHandler} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        // <Card>
        //     <div className={classes.listBlock}>
        //         <div className={classes.header}>
        //             <label>Direction</label>
        //             <label>Standard</label>
        //             <label>Minimum</label>
        //             <label>Maximum</label>
        //             <label>Fixed</label>
        //             <label></label>
        //         </div>
        //         {dimensionLines}
        //         <DimensionForm addDimension={addDimensionHandler} />
        //     </div>
        // </Card>
    )
};

export default DimensionTable;