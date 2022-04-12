import classes from './OrderLines.module.css';

function OrderLines(props) {
    console.log(props.line);
    return (
        <div className={classes.line}>
            <div>{props.line.lineNum}</div>
            <div>{props.line.configCode}</div>
            <div>{props.line.hinging}</div>
            <div>{props.line.ends}</div>
            <div>{props.line.quantity}</div>
            <div>{props.line.width}</div>
            <div>x</div>
            <div>{props.line.height}</div>
            <div>x</div>
            <div>{props.line.depth}</div>
            <div className={classes.notes}>{props.line.comment}</div>
        </div>
    )
};

export default OrderLines;