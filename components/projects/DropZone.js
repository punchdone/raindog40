// import { Fragment } from 'react';
import {
    Grid
} from '@mui/material';

import classes from './DropZone.module.css';
import Order from './orders/Order';

function DropZone(props) {
    // const [highlighted, setHighlighted] = useState(false);

    return (
            <Grid container>
                <Grid item xs={1} sm={2}></Grid>
                <Grid item xs={8} sm={6}>
                    <div
                        className={classes.dropZone}
                    // onDragEnter={() => {
                    //     setHighlighted(true);
                    // }}
                    // onDragLeave={() => {
                    //     setHighlighted(false);
                    // }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}
                    onDrop={(e) => {
                        props.onDrop(e);
                    }}
                    >
                    Drop .ORD File Here
                    </div>
                </Grid>
                <Grid item xs={1} sm={2}></Grid>
                <Order customer={props.customer} lines={props.lines} />
            </Grid>
    )
};

export default DropZone;