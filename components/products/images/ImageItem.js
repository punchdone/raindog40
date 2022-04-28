import Image from 'next/image';

import classes from './ImageItem.module.css';

function CatalogImage(props) {

    return (
        <div className={classes.pic}>
            <Image
                id={props.image.public_id} 
                src={props.image.url}
                alt={props.image.public_id}
                width='150px'
                height='150px'
            />
            <div className={classes.imageButton}>
                <button onClick={props.deleteImage} id={props.image.public_id} >Delete</button>
            </div>
        </div>
    )
};

export default CatalogImage;