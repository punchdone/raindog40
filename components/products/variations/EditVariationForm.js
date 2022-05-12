import { useRef, useEffect, useState} from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import classes from './EditVariationForm.module.css';
import ImageElement from '../images/ImageElement';
import PricingForm from '../pricing/PricingForm';
import DimensionTable from '../dimensions/DimensionTable';
import CountForm from '../counts/CountForm';
import Spinner from '../../layout/spinner';

function EditVariationForm(props) {
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(true);
    const [subtypes, setSubtypes] = useState([]);
    const [showSubtypes, setShowSubtypes] = useState(false);
    const [showPricing, setShowPricing] = useState(false);
    const [pricing, setPricing] = useState(props.variation.pricing);
    const [showDimensions, setShowDimensions] = useState(false);
    const [dimensions, setDimensions] = useState(props.variation.dimensions);
    const [showCounts, setShowCounts] = useState(false);
    const [counts, setCounts] = useState(props.variation.counts);
    const [images, setImages] = useState(props.variation.images);

    const configCodeInputRef = useRef();
    const titleInputRef = useRef();
    const subtypeInputRef = useRef();
    const noteInputRef = useRef();

    console.log(dimensions);

    useEffect(() =>{
        fetchHandler();
    }, []);

    async function fetchHandler() {
        const types = await axios.get('/api/taxonomy');
        if (props.product.category._id === '6257143de97f4957f084d47b') {
            setSubtypes(types.data.filter(type => type.area === 'MillType'));
            setShowSubtypes(true);
        } else if (props.product.category._id === '62571446e97f4957f084d47d' || props.product.category._id === '62571453e97f4957f084d47f') {
            setShowSubtypes(false);
            return
        } else {
            setSubtypes(types.data.filter(type => type.area === 'CaseType'));
            setShowSubtypes(true);
        };

        setIsLoading(false);
    };

    const subtypeOptions = subtypes.map(subtype => 
        <option key={subtype._id} value={subtype._id}>{subtype.title}</option>
    );

    function addImageHandler(image) {
        setImages([...images, image]);
    };

    async function removeImageHandler(e) {
        e.preventDefault();
        
        setImages(images.filter((image) => image.public_id !== e.target.id));

        const response = await axios.delete('/api/images/' + e.target.id);

        console.log(response);
    };

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

     function deleteDimensionHandler(direction) {
         setDimensions(dimensions.filter(dimension => dimension.direction !== direction));
     };
 
     function countClick() {
         setShowCounts(!showCounts);
     };
 
     function countHandler(counts) {
        //  setCounts((prevState) => {
        //      return { ...prevState, counts }
        //  });
        setCounts(counts);
     };

    async function submitHandler(e) {
        e.preventDefault();
        const data = {
            subCategory: subtypeInputRef.current.value,
            configCode: configCodeInputRef.current.value,
            title: titleInputRef.current.value,
            notes: noteInputRef.current.value,
            images,
            pricing,
            dimensions,
            counts
        }
        // console.log(data);
        const variation = await axios.put('/api/products/' + props.product._id + '/variations/' + props.variation._id, data);
        // console.log(variation);
        router.replace('/products/' + props.product._id);

    }

    return (
        <div className={classes.variationEditForm}>
            <form id='variationEditForm' className={classes.form}>
                <div className={classes.control}>
                    {showSubtypes && 
                    <div>
                        <label htmlFor="subtype">Sub Type</label>
                        <select ref={subtypeInputRef} defaultValue={props.variation.subcategory}>
                            {subtypeOptions}
                        </select>
                    </div>
                    }
                    <label htmlFor="configCode">Configuration Code</label>
                    <input type='text' required id='configCode' ref={configCodeInputRef} defaultValue={props.variation.configCode} />
                    <label htmlFor="title">Title</label>
                    <input type='text' required id='title' ref={titleInputRef} defaultValue={props.variation.title} />
                    <label onClick={pricingClick}>Pricing <AiOutlinePlus /></label>
                    {showPricing && <PricingForm loadPricing={pricingHandler} />}
                    <label onClick={dimensionClick}>Dimensions <AiOutlinePlus /></label>
                    {showDimensions && <DimensionTable loadDimension={dimensionHandler} deleteDimension={deleteDimensionHandler} dimensions={dimensions} />}
                    <label onClick={countClick}>Product Counts <AiOutlinePlus /></label>
                    {showCounts && <CountForm loadCounts={countHandler} />}
                    <label htmlFor='note'>Note</label>
                    <textarea id='note' ref={noteInputRef} defaultValue={props.variation.notes} />
                </div>
                <ImageElement images={images} addImage={addImageHandler} deleteImage={removeImageHandler} />
                <div className={classes.actions}>
                    <button onClick={submitHandler}>Update</button>
                    <button>Delete</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </form>
         </div>
    )
};

export default EditVariationForm;