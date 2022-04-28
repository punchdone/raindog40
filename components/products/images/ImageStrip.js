import ImageItem from "./ImageItem";

import classes from "./ImageStrip.module.css";
import LinearSpinner from "../../layout/linearSpinner";

function Gallery(props) {
  const imageUpload = props.imageUpload;

  function clickButton(e) {
    alert('This is still the button!');
  };

  const imageList = props.images.map((image) => (
    <ImageItem
      key={image._id}
      image={image}
      productId={props.productId}
      deleteImage={props.deleteImage}
    />
  ));

  return (
    <div className={classes.gallery}>
      {(imageUpload && <LinearSpinner />) || imageList}
    </div>
  );
}

export default Gallery;
