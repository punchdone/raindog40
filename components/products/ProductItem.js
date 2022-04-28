import Image from 'next/image';
import { useRouter } from 'next/router';

import classes from './ProductItem.module.css';

function ProductItem(props) {
    const router = useRouter();

    function editHandler() {
        router.push('/products/' + props.product._id);
    };

    // if (props.images.length > 0) {
    //     console.log(props.images[0].url);
    // };
    

    return (
        <div className={classes.list}>

            <div>
                {props.product.images.length > 0 && 
                <Image 
                    src={props.product.images[0].url} 
                    alt={props.product.images[0].public_id}
                    width='80px'
                    height='80px'
                />}
            </div>
            <div>{props.product.productLine.title}</div>
            <div>{props.product.category.title}</div>
            <div>{props.product.configCode}</div>
            <div>{props.product.title}</div>
            <div className={classes.actions}>
                <button onClick={editHandler}>Edit</button>
            </div>
        </div>
    )
};

export default ProductItem;