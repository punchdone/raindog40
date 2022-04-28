import { useState } from "react";

import classes from "./ImageElement.module.css";
import ImageStrip from "./ImageStrip";

function ImageElement(props) {
  const [imageUpload, setImageUpload] = useState(false);

  async function imageChangeHandler(e) {
    setImageUpload(true);

    const fileInput = e.currentTarget;

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/punchdone/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    const enteredImage = { public_id: data.public_id, url: data.secure_url };

    console.log(enteredImage);

    props.addImage(enteredImage);

    e.target.value = null;

    setImageUpload(false);

  }

  return (
    <div>
      <ImageStrip
        images={props.images}
        imageUpload={imageUpload}
        deleteImage={props.deleteImage}
      />
      <div className={classes.control}>
        <label htmlFor="files">Images</label>
        <input
          type="file"
          accept=".jpg, .png, .pdf, .jpeg"
          name="images"
          onChange={imageChangeHandler}
        />
      </div>
    </div>
  );
}

export default ImageElement;
