import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material';

import classes from './TaxonomyList.module.css';

function TaxonomyList({ types, deleteItem, editItem }) {

    const deleteHandler = (e) => {
        deleteItem(e.target.id);
    };

    const editHandler = (e) => {
        editItem(e.target.id);
    }

    return (
        <div className={classes.list}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxheight: 440 }}>
                <Table sx={{ minWidth: 200 }} aria-label='Taxonomy List'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Taxonomy</TableCell>
                            <TableCell>Element</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {types.map((type) => (
                            <TableRow key={type._id}>
                                <TableCell>{type.area}</TableCell>
                                <TableCell>{type.title}</TableCell>
                                <TableCell>
                                    <Button variant='outlined' id={type._id} onClick={editHandler}>Edit</Button>
                                    <Button variant='outlined' id={type._id} onClick={deleteHandler}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        </div>
    )
}

export default TaxonomyList;