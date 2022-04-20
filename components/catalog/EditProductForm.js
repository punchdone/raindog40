import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';

import Card from '../ui/Card';
import classes from './EditProductForm.module.css';
import Spinner from '../layout/spinner';
import Gallery from './images/gallery';

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
    const [imageSource, setImageSource] = useState();
    const [uploadData, setUploadData] = useState();

    const productLineInputRef = useRef();
    const configCodeInputRef = useRef();
    const titleInputRef = useRef();
    const typeInputRef = useRef();
    const subtypeInputRef = useRef();
    const noteInputRef = useRef();

    useEffect(() => {
        fetchHandler();
    }, []);

    async function fetchHandler() {
        const types = await axios.get('/api/products/taxonomy');
        setAllTypes(types.data);
        const filteredTypes = types.data.filter(type => type.area === 'CabType');
        setTypes(filteredTypes);
        const productLineTypes = types.data.filter(type => type.area === 'ProductLine');
        setProductLines(productLineTypes);
        if (props.product.category === '6257143de97f4957f084d47b') {
            setSubtypes(types.data.filter(type => type.area === 'MillType'));
        } else if (props.product.category === '62571446e97f4957f084d47d' || props.product.category === '62571453e97f4957f084d47f') {
            setShowSubtypes(false);
            return
        } else {
            setSubtypes(types.data.filter(type => type.area === 'CaseType'));
        };
        setIsLoading(false);
    };

    const typeOptions = types.map(type => 
        <option key={type._id} value={type._id}>{type.title}</option>
    );

    const productLineOptions = productLines.map(productLine => 
        <option key={productLine._id} value={productLine._id}>{productLine.title}</option>
    );

    async function subtypeHandler(e) {
        e.preventDefault();
        console.log(e.target.value);
        if (e.target.value === '6257143de97f4957f084d47b') {
            setSubtypes(allTypes.filter(type => type.area === 'MillType'));
            setShowSubtypes(true);
        } else if (e.target.value === '62571446e97f4957f084d47d' || e.target.value === '62571453e97f4957f084d47f') {
            setShowSubtypes(false);
            return
        } else {
            setSubtypes(allTypes.filter(type => type.area === 'CaseType'));
            setShowSubtypes(true);
        };
    };

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

     function submitHandler(e) {
        e.preventDefault();
     }

     function imageChangeHandler(e) {


        console.log(e.currentTarget);

         const reader = new FileReader();

         reader.onload = function(onLoadEvent) {
             setImageSource(onLoadEvent.target.result);
             setUploadData(undefined)
         }

         reader.readAsDataURL(e.target.files[0]);

         console.log(reader);
     }

    return (
        <Card>
            {isLoading && <div className={classes.spinner}><Spinner /></div> || 
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="productLine">Product Line</label>
                    <select name='productLine' required ref={productLineInputRef} value={props.product.productLine}>
                        {productLineOptions}
                    </select>
                    <label htmlFor="type">Cabinet Type</label>
                    <select name='type' required ref={typeInputRef} onChange={subtypeHandler} value={props.product.category}>
                        {typeOptions}
                    </select>
                    {showSubtypes && 
                    <div>
                        <label htmlFor="subtype">Sub Type</label>
                        <select ref={subtypeInputRef} value={props.product.subCategory}>
                            {subtypeOptions}
                        </select>
                    </div>
                    }
                    <label htmlFor="configCode">Configuration Code</label>
                    <input type='text' required id='configCode' ref={configCodeInputRef} value={props.product.configCode}/>
                    <label htmlFor="title">Title</label>
                    <input type='text' required id='title' ref={titleInputRef} value={props.product.title}/>
                    <label onClick={pricingClick}>Pricing <AiOutlinePlus /></label>
                    {showPricing && <PricingForm loadPricing={pricingHandler} />}
                    <label onClick={dimensionClick}>Dimensions <AiOutlinePlus /></label>
                    {showDimensions && <DimensionTable loadDimension={dimensionHandler} dimensions={dimensions} />}
                    <label onClick={countClick}>Product Counts <AiOutlinePlus /></label>
                    {showCounts && <CountForm loadCounts={countHandler} />}
                </div>
                <div className={classes.control}>
                    <label htmlFor='note'>Note</label>
                    <textarea id='note' ref={noteInputRef} value={props.product.notes}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='files'>Images</label>
                    <Gallery images={props.product.images} />
                    <input type='file' accept='.jpg, .png, .pdf, .jpeg' name='images' onChange={imageChangeHandler} />
                    <img src={imageSource} />
                </div>
                <div className={classes.actions}>
                    <button type='submit'>Add Edited Product</button>
                </div>
            </form>}
        </Card>
        
    )
};

export default EditProductForm;