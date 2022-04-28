import VariationItem from './VariationItem';
import classes from './VariationsList.module.css';

function VariationsList(props) {

    const variations = props.product.variations;

    const variationList = variations.map((variation) => (
        <VariationItem 
            key={variation._id}
            detail={variation}
            onEdit={props.onEdit}
            product={props.product}
        />
    ));

    return (
        <div className={classes.listBlock}>
            <div className={classes.header}>
                <label>Image</label>
                <label>Config Code</label>
                <label>Title</label>
                <label></label>
            </div>
            {variationList}
        </div>
    );
}

export default VariationsList;