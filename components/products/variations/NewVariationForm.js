import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
// import { useRouter } from 'next/router';

import Card from '../../ui/Card';
import classes from './NewVariationForm.module.css';
import PricingForm from '../pricing/PricingForm';
import DimensionTable from '../dimensions/DimensionTable';
import CountForm from '../counts/CountForm';
import Spinner from '../../layout/spinner';
import ImageElement from '../images/ImageElement';

function NewVariationForm(props) {
    // const router = useRouter();

    // console.log(props.product.category);

    const [isLoading, setIsLoading] = useState(true);
    const [allTypes, setAllTypes] = useState([]);
    // const [productLines, setProductLines] = useState([]);
    // const [types, setTypes] = useState([]);
    const [subtypes, setSubtypes] = useState([]);
    const [showSubtypes, setShowSubtypes] = useState(true);
    const [showPricing, setShowPricing] = useState(false);
    const [pricing, setPricing] = useState({});
    const [showDimensions, setShowDimensions] = useState(false);
    const [dimensions, setDimensions] = useState([]);
    const [showCounts, setShowCounts] = useState(false);
    const [counts, setCounts] = useState({});
    const [images, setImages] = useState([]);

    // const productLineInputRef = useRef();
    const configCodeInputRef = useRef();
    const titleInputRef = useRef();
    // const typeInputRef = useRef();
    const subtypeInputRef = useRef();
    const noteInputRef = useRef();

    useEffect(() =>{
        fetchHandler();
    }, []);

    function imageChangeHandler(e) {
        const reader = new FileReader();

        reader.onload = function(onLoadEvent) {
            setImageSource(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(e.target.files[0]);
    };

    async function fetchHandler() {
        const types = await axios.get('/api/products/taxonomy');
        // setAllTypes(types.data);
        // const filteredTypes = types.data.filter(type => type.area === 'CabType');
        // setTypes(filteredTypes);
        // const productLineTypes = types.data.filter(type => type.area === 'ProductLine');
        // setProductLines(productLineTypes);

        if (props.product.category === '6257143de97f4957f084d47b') {
            setSubtypes(types.data.filter(type => type.area === 'MillType'));
            setShowSubtypes(true);
        } else if (props.product.category === '62571446e97f4957f084d47d' || props.product.category === '62571453e97f4957f084d47f') {
            setShowSubtypes(false);
            return
        } else {
            setSubtypes(types.data.filter(type => type.area === 'CaseType'));
            setShowSubtypes(true);
        };

        setIsLoading(false);
    };

    // const typeOptions = types.map(type => 
    //     <option key={type._id} value={type._id}>{type.title}</option>
    // );

    // const productLineOptions = productLines.map(productLine => 
    //     <option key={productLine._id} value={productLine._id}>{productLine.title}</option>
    // );

    // async function subtypeHandler(e) {
    //     e.preventDefault();
    //     console.log(e.target.value);
    //     if (e.target.value === '6257143de97f4957f084d47b') {
    //         setSubtypes(allTypes.filter(type => type.area === 'MillType'));
    //         setShowSubtypes(true);
    //     } else if (e.target.value === '62571446e97f4957f084d47d' || e.target.value === '62571453e97f4957f084d47f') {
    //         setShowSubtypes(false);
    //         return
    //     } else {
    //         setSubtypes(allTypes.filter(type => type.area === 'CaseType'));
    //         setShowSubtypes(true);
    //     };
    // };

    const subtypeOptions = subtypes.map(subtype => 
        <option key={subtype._id} value={subtype._id}>{subtype.title}</option>
    );

    function pricingClick() {
       setShowPricing(!showPricing);
    };

    function pricingHandler(pricing) {
        console.log(pricing);
        setPricing((prevState) => {
            return { ...prevState, pricing }
        });
    };

    function dimensionClick() {
        setShowDimensions(!showDimensions);
    };

    function dimensionHandler(dimension) {
        setDimensions([...dimensions, dimension]);
    };

    function countClick() {
        setShowCounts(!showCounts);
    };

    function countHandler(count) {
        setCounts((prevState) => {
            return { ...prevState, count }
        });
    };

    function addImageHandler(image) {
        setImages([...images, image]);
    };

    async function removeImageHandler(e) {
        e.preventDefault();
        setImages(images.filter((image) => image.public_id !== e.target.id));

        const response = await axios.delete('/api/images/' + e.target.id);

        console.log(response);
    };

    function submitHandler(e) {
        e.preventDefault();
        // setIsLoading(true);

        // const enteredProductLine = productLineInputRef.current.value;
        const enteredConfigCode = configCodeInputRef.current.value;
        const enteredTitle = titleInputRef.current.value;
        // const enteredType = typeInputRef.current.value;
        const enteredSubtype = subtypeInputRef.current.value;
        const enteredPrice = pricing.pricing;
        const enteredCounts = counts.count;
        const enteredDimensions = dimensions;
        const enteredNotes = noteInputRef.current.value;

        // const form = e.currentTarget;
        // const fileInput = Array.from(form.elements).find(({ name }) => name === 'images');

        // const formData = new FormData();

        // for ( const file of fileInput.files) {
        //     formData.append('file', file);
        // };

        // formData.append('upload_preset', 'my-uploads');

        // const data = await fetch('https://api.cloudinary.com/v1_1/punchdone/image/upload', {
        //     method: 'POST',
        //     body: formData
        // }).then(r => r.json());

        // setImageSource(data.secure_url);
        // setUploadData(data);

        // const enteredImage = [
        //     { 'public_id': data.public_id, 'url': data.secure_url }
        // ];

        // console.log(enteredImage);

        let variationData = {
            configCode: enteredConfigCode,
            title: enteredTitle,
            subCategory: enteredSubtype,
            pricing: enteredPrice,
            counts: enteredCounts,
            dimensions: enteredDimensions,
            notes: enteredNotes,
            images: images
        };

        console.log(variationData);

        props.addVariation(variationData);

        // const newProduct = await axios.post('/api/products', productData);

        // setIsLoading(false);

        // router.push('/products');
    };

    function productLineHandler(e) {
        e.preventDefault();
        console.log(e.target.value);
        console.log(productLineInputRef.current.value);
    }

    return (
       
        <Card>
             {isLoading && <div className={classes.spinner}><Spinner /></div> || 
            <form id='variationForm' className={classes.form}>
                <div className={classes.control}>
                    {/* <label htmlFor="productLine">Product Line</label>
                    <select name='productLine' required ref={productLineInputRef} onChange={productLineHandler}>
                        {productLineOptions}
                    </select>
                    <label htmlFor="type">Cabinet Type</label>
                    <select name='type' required ref={typeInputRef} onChange={subtypeHandler}>
                        {typeOptions}
                    </select> */}
                    {showSubtypes && 
                    <div>
                        <label htmlFor="subtype">Sub Type</label>
                        <select ref={subtypeInputRef}>
                            {subtypeOptions}
                        </select>
                    </div>
                    }
                    <label htmlFor="configCode">Configuration Code</label>
                    <input type='text' required id='configCode' ref={configCodeInputRef} />
                    <label htmlFor="title">Title</label>
                    <input type='text' required id='title' ref={titleInputRef} />
                    <label onClick={pricingClick}>Pricing <AiOutlinePlus /></label>
                    {showPricing && <PricingForm loadPricing={pricingHandler} />}
                    <label onClick={dimensionClick}>Dimensions <AiOutlinePlus /></label>
                    {showDimensions && <DimensionTable loadDimension={dimensionHandler} dimensions={dimensions} />}
                    <label onClick={countClick}>Product Counts <AiOutlinePlus /></label>
                    {showCounts && <CountForm loadCounts={countHandler} />}
                </div>
                <div className={classes.control}>
                    <label htmlFor='note'>Note</label>
                    <textarea id='note' ref={noteInputRef} />
                </div>
                <ImageElement images={images} addImage={addImageHandler} deleteImage={removeImageHandler} />
                <div className={classes.actions}>
                    <button onClick={submitHandler}>Add Variation</button>
                </div>
            </form>}
        </Card>
    )
};

export default NewVariationForm;