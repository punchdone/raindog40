import Image from 'next/image';

import classes from './VariationItem.module.css';

function VariationItem(props) {
    const variation = props.detail;

    // console.log(variation);

    function editHandler(e) {
        e.preventDefault();
        // console.log(variation);
        props.onEdit(variation);
    }

    return (
        <div className={classes.list}>
            <div>
                {variation.images.length > 0 && 
                <Image 
                    src={variation.images[0].url} 
                    alt={variation.images[0].public_id}
                    width='80px'
                    height='80px'
                />}
                {/* {props.images && <img src={props.images[0].url} alt={props.images[0].public_id} />} */}
            </div>
            <div>{variation.configCode}</div>
            <div>{variation.title}</div>
            <div className={classes.actions}>
                <button onClick={editHandler} value={variation._id}>Edit</button>
            </div>
        </div>
    )
};

export default VariationItem;