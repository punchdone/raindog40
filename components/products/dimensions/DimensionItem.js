import { useEffect, useState, Fragment } from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { taxonomyLookup } from '../../../helpers/Lookups';
// import classes from './DimensionItem.module.css';

function DimensionItem(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [direction, setDirection] = useState();

    useEffect(() => {
        lookupFunc(props.dimension.direction)
    }, []);

    const lookupFunc = async (directionCode) => {
        const direction = await taxonomyLookup(directionCode);
        // console.log(direction);
        setDirection(direction);
        setIsLoading(false);
    };

    const deletionHandler = (e) => {
        e.preventDefault();
        props.deleteDimension(e.target.id);
    }

    // const dimensionLine =
    //     // <div>
    //     //     <div>{direction}</div>
    //     //     <div>{props.dimension.standard}</div>
    //     //     <div>{props.dimension.min}</div>
    //     //     <div>{props.dimension.max}</div>
    //     //     <div><input type='checkbox' checked={props.dimension.fixed} /></div>
    //     // </div>
    //     <div>This is nothing!</div>

    return (
        <Fragment>
            {isLoading && (<TableRow>Is Loading</TableRow>) ||
            <TableRow key={props.dimension.direction} sx={{ "&: last-child td, & last-child th": { border: 0 } }}>
                <TableCell>{direction}</TableCell>
                <TableCell>{props.dimension.standard}</TableCell>
                <TableCell>{props.dimension.min}</TableCell>
                <TableCell>{props.dimension.max}</TableCell>
                <TableCell><input type='checkbox' checked={props.dimension.fixed} readOnly /></TableCell>
                <TableCell><button onClick={deletionHandler} id={props.dimension.direction}>Delete</button></TableCell>
            </TableRow>
            }
        </Fragment>
    )
};

export default DimensionItem;