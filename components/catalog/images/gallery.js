import CatalogImage from './catalogImage';

function Gallery(props) {
    return (
        <div>
            {props.images.map((image) => <CatalogImage key={image._id} image={image} />)}
        </div>
    )
};

export default Gallery;