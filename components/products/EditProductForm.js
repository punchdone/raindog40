import { useRef, useEffect, useState } from "react";
import axios from "axios";
// import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./EditProductForm.module.css";
import Spinner from "../layout/spinner";
import Gallery from "./images/ImageStrip";
import VariationsList from "./variations/VariationsList";
import EditVariationModal from './variations/EditVariationModal';
import NewVariationForm from './variations/NewVariationForm';


function EditProductForm(props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [allTypes, setAllTypes] = useState([]);
  const [productLines, setProductLines] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [showSubtypes, setShowSubtypes] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [pricing, setPricing] = useState({});
  const [showDimensions, setShowDimensions] = useState(false);
  const [dimensions, setDimensions] = useState([]);
  const [showCounts, setShowCounts] = useState(false);
  const [counts, setCounts] = useState({});
  // const [imageSource, setImageSource] = useState();
  // const [uploadData, setUploadData] = useState();
  const [images, setImages] = useState(props.product.images);
  const [imageUpload, setImageUpload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [targetVar, setTargetVar] = useState();
  const [showVariation, setShowVariation] = useState(false);
  const [product, setProduct] = useState(props.product);

  const productLineInputRef = useRef();
  // const configCodeInputRef = useRef();
  const titleInputRef = useRef();
  const typeInputRef = useRef();
  // const subtypeInputRef = useRef();
  // const noteInputRef = useRef();

  useEffect(() => {
    fetchHandler();
  }, []);

  async function fetchHandler() {
    const types = await axios.get("/api/products/taxonomy");
    setAllTypes(types.data);
    const filteredTypes = types.data.filter((type) => type.area === "CabType");
    setTypes(filteredTypes);
    const productLineTypes = types.data.filter(
      (type) => type.area === "ProductLine"
    );
    setProductLines(productLineTypes);
    if (props.product.category === "6257143de97f4957f084d47b") {
      setSubtypes(types.data.filter((type) => type.area === "MillType"));
    } else if (
      props.product.category === "62571446e97f4957f084d47d" ||
      props.product.category === "62571453e97f4957f084d47f"
    ) {
      setShowSubtypes(false);
      return;
    } else {
      setSubtypes(types.data.filter((type) => type.area === "CaseType"));
    }
    setIsLoading(false);
  }

  const typeOptions = types.map((type) => (
    <option key={type._id} value={type._id}>
      {type.title}
    </option>
  ));

  const productLineOptions = productLines.map((productLine) => (
    <option key={productLine._id} value={productLine._id}>
      {productLine.title}
    </option>
  ));

  // async function subtypeHandler(e) {
  //   e.preventDefault();
  //   // console.log(e.target.value);
  //   if (e.target.value === "6257143de97f4957f084d47b") {
  //     setSubtypes(allTypes.filter((type) => type.area === "MillType"));
  //     setShowSubtypes(true);
  //   } else if (
  //     e.target.value === "62571446e97f4957f084d47d" ||
  //     e.target.value === "62571453e97f4957f084d47f"
  //   ) {
  //     setShowSubtypes(false);
  //     return;
  //   } else {
  //     setSubtypes(allTypes.filter((type) => type.area === "CaseType"));
  //     setShowSubtypes(true);
  //   }
  // }

  // const subtypeOptions = subtypes.map((subtype) => (
  //   <option key={subtype._id} value={subtype._id}>
  //     {subtype.title}
  //   </option>
  // ));

  function pricingClick() {
    setShowPricing(!showPricing);
  }

  function pricingHandler(pricing) {
    console.log(pricing);
    setPricing((prevState) => {
      return { ...prevState, pricing };
    });
  }

  function dimensionClick() {
    setShowDimensions(!showDimensions);
  }

  function dimensionHandler(dimension) {
    setDimensions([...dimensions, dimension]);
  }

  function countClick() {
    setShowCounts(!showCounts);
  }

  function countHandler(count) {
    setCounts((prevState) => {
      return { ...prevState, count };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    const enteredProductLine = productLineInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    // const enteredSubtype = subtypeInputRef.current.value;
    // const enteredConfigCode = configCodeInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;

    let productData = {
        productLine: enteredProductLine,
        // configCode: enteredConfigCode,
        title: enteredTitle,
        category: enteredType,
        images
        // subCategory: enteredSubtype
    }

    // console.log(productData);

    const product = await axios.put('/api/products/' + props.product._id, productData);

    // console.log(product);
    
    setIsLoading(false);
    router.replace('/products/' + props.product._id);

  }

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

    const product = await fetch(
      "/api/products/" + props.product._id + "/images",
      {
        method: "POST",
        body: JSON.stringify(enteredImage),
        headers: { "content-type": "application/JSON" },
      }
    );

    console.log(product);

    setImages([...images, enteredImage]);

    e.target.value = null;

    setImageUpload(false);

    //  const reader = new FileReader();

    //  reader.onload = function(onLoadEvent) {
    //      setImageSource(onLoadEvent.target.result);
    //      setUploadData(undefined)
    //  }

    //  reader.readAsDataURL(e.target.files[0]);

    //  console.log(reader);
  }

  async function imageDeleteHandler(e) {
    e.preventDefault();
        
    setImages(images.filter((image) => image.public_id !== e.target.id));

    const response = await axios.delete('/api/images/' + e.target.id);

    console.log(response);
  };

  function editVariationHandler(variation) {
    // console.log(variationId);
    // console.log(props.product);
    setTargetVar(variation);
    setShowModal(true);
  }

  function hideEditVariationHandler() {
    setShowModal(false);
  }

  function variationClick(e) {
    e.preventDefault();
    setShowVariation(!showVariation);
  };

  async function addVariationHandler(variation) {
    // console.log(variation);
    const res = await axios.post('/api/products/' + props.product._id + '/variations', variation);
    // console.log(res);
    setShowVariation(false);
    router.replace('/products/' + props.product._id);

};

function catalogClick(e) {
  e.preventDefault();
  router.replace('/products');
};

  return (
    <Card>
      {showModal && (<EditVariationModal product={props.product} variation={targetVar} onClose={hideEditVariationHandler} />)}
      {(isLoading && (
        <div className={classes.spinner}>
          <Spinner />
        </div>
      )) || (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="productLine">Product Line</label>
            <select
              name="productLine"
              required
              ref={productLineInputRef}
              defaultValue={props.product.productLine._id}
            >
              {productLineOptions}
            </select>
            <label htmlFor="type">Cabinet Type</label>
            <select
              name="type"
              required
              ref={typeInputRef}
              // onChange={subtypeHandler}
              defaultValue={props.product.category._id}
            >
              {typeOptions}
            </select>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              id="title"
              ref={titleInputRef}
              defaultValue={props.product.title}
            />
            {/* <label onClick={pricingClick}>
              Pricing <AiOutlinePlus />
            </label>
            {showPricing && <PricingForm loadPricing={pricingHandler} />}
            <label onClick={dimensionClick}>
              Dimensions <AiOutlinePlus />
            </label>
            {showDimensions && (
              <DimensionTable
                loadDimension={dimensionHandler}
                dimensions={dimensions}
              />
            )}
            <label onClick={countClick}>
              Product Counts <AiOutlinePlus />
            </label>
            {showCounts && <CountForm loadCounts={countHandler} />} */}
          </div>
          {/* <div className={classes.control}>
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              ref={noteInputRef}
              value={props.product.notes}
            />
          </div> */}
          <div className={classes.control}>
            <label htmlFor="files">Images</label>
            <Gallery
              images={images}
              imageUpload={imageUpload}
              productId={props.product._id}
              deleteImage={imageDeleteHandler}
            />
            <input
              type="file"
              accept=".jpg, .png, .pdf, .jpeg"
              name="images"
              onChange={imageChangeHandler}
            />
          </div>
          <Card>
            <div className={classes.control}>
              <label htmlFor='variations'>Variations</label>
              <VariationsList id='variations' product={props.product} onEdit={editVariationHandler} />
            </div>
          </Card>
          <div className={classes.variation}>
                {showVariation && <NewVariationForm product={props.product} addVariation={addVariationHandler} />}
            </div>
          <div className={classes.actions}>
            <button onClick={variationClick}>Add Variation</button>
            <button type="submit">Update Product</button>
            <button>Delete</button>
            <button onClick={catalogClick}>Catalog Return</button>
          </div>
        </form>
      )}
    </Card>
  );
}

export default EditProductForm;
