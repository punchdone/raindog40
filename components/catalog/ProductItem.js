import classes from './ProductItem.module.css';

function ProductItem(props) {
    return (
        <div className={classes.list}>
            <div>{props.category}</div>
            <div>{props.configCode}</div>
            <div>{props.title}</div>
        </div>
    )
};

export default ProductItem;