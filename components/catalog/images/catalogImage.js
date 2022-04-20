import Image from 'next/image';

function CatalogImage(props) {
    return (
        <div>
            <Image 
                src={props.image.url}
                alt={props.image.public_id}
                width='100px'
                height='100px'
            />
        </div>
    )
};

export default CatalogImage;