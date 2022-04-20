import Image from 'next/image';
import { useRouter } from 'next/router';

import classes from './ProductItem.module.css';

function ProductItem(props) {
    const router = useRouter();

    function editHandler() {
        router.push('/products/' + props.productId);
    };

    if (props.images.length > 0) {
        console.log(props.images[0].url);
    };
    

    return (
        <div className={classes.list}>
            <div>
                {props.images.length > 0 && 
                <Image 
                    src={props.images[0].url} 
                    alt={props.images[0].public_id}
                    width='80px'
                    height='80px'
                />}
                {/* {props.images && <img src={props.images[0].url} alt={props.images[0].public_id} />} */}
            </div>
            <div>{props.category}</div>
            <div>{props.configCode}</div>
            <div>{props.title}</div>
            <div className={classes.actions}>
                <button onClick={editHandler}>Edit</button>
            </div>
        </div>
    )
};

export default ProductItem;