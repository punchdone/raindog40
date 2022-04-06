import { Fragment } from 'react';

import classes from './DropZone.module.css';
import Order from './orders/Order';

function DropZone(props) {
    // const [highlighted, setHighlighted] = useState(false);

    return (
        <Fragment>
            <div className={classes.production}>
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
            </div>
            <Order customer={props.customer} lines={props.lines} />
        </Fragment>
    )
};

export default DropZone;