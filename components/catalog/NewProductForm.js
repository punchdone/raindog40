import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useMutate } from 'restful-react';

import Card from '../ui/Card';
import classes from './NewProductForm.module.css';
import PricingForm from './pricing/PricingForm';
import DimensionTable from './dimensions/DimensionTable';
import CountForm from './counts/CountForm';

function NewProductForm() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [allTypes, setAllTypes] = useState([]);
    const [productLines, setProductLines] = useState([]);
    const [types, setTypes] = useState([]);
    const [subtypes, setSubtypes] = useState([]);
    const [showSubtypes, setShowSubtypes] = useState(false);
    const [showPricing, setShowPricing] = useState(false);
    const [pricing, setPricing] = useState({});
    const [showDimensions, setShowDimensions] = useState(false);
    const [dimensions, setDimensions] = useState([]);
    const [showCounts, setShowCounts] = useState(false);
    const [counts, setCounts] = useState({});
    const [selectedImage, setSelectedImage] = useState();
    const { mutate: uploadImage } = useMutate({
        verb: 'POST',
        path: '/api/products/images'
    });

    const productLineInputRef = useRef();
    const configCodeInputRef = useRef();
    const titleInputRef = useRef();
    const typeInputRef = useRef();
    const subtypeInputRef = useRef();
    const noteInputRef = useRef();
    // const p1InputRef = useRef();

    useEffect(() =>{
        fetchHandler();
    }, []);

    function imageChangeHandler(e) {
        console.log(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    function handleImageUpload() {
        if(!selectedImage) { return; }
        const formData = new FormData();
        formData.append('image', selectedImage);

        uploadImage(formData)
            .then(uploadedImage => {
                console.log(uploadImage);
            })
            .catch(_ => {
                console.log('Oooops, something went wrong!')
            })
    }

    async function fetchHandler() {
        const types = await axios.get('/api/products/taxonomy');
        console.log(types.data);
        setAllTypes(types.data);
        const filteredTypes = types.data.filter(type => type.area === 'CabType');
        console.log(filteredTypes);
        setTypes(filteredTypes);
        const productLineTypes = types.data.filter(type => type.area === 'ProductLine');
        setProductLines(productLineTypes);
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

    async function submitHandler(e) {
        e.preventDefault();

        const enteredProductLine = productLineInputRef.current.value;
        const enteredConfigCode = configCodeInputRef.current.value;
        const enteredTitle = titleInputRef.current.value;
        const enteredType = typeInputRef.current.value;
        const enteredSubtype = subtypeInputRef.current.value;
        const enteredPrice = pricing.pricing;
        const enteredCounts = counts.count;
        const enteredDimensions = dimensions;
        
        handleImageUpload();

        let productData = {
            productLine: enteredProductLine,
            configCode: enteredConfigCode,
            title: enteredTitle,
            category: enteredType,
            subCategory: enteredSubtype,
            pricing: enteredPrice,
            counts: enteredCounts,
            dimensions: enteredDimensions
        };

        console.log(productData);

        const newProduct = await axios.post('/api/products', productData);

        console.log(newProduct);

        router.push('/products');
    };

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                <label htmlFor="productLine">Product Line</label>
                    <select required ref={productLineInputRef} onChange={subtypeHandler}>
                        {productLineOptions}
                    </select>
                    <label htmlFor="type">Cabinet Type</label>
                    <select required ref={typeInputRef} onChange={subtypeHandler}>
                        {typeOptions}
                    </select>
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
                <div className={classes.control}>
                    <input type='file' accept='.jpg, .png, .pdf, .jpeg' onChange={imageChangeHandler} />
                </div>
                <div className={classes.actions}>
                    <button>Add Product</button>
                </div>
            </form>
        </Card>
    )
};

export default NewProductForm;