import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import classes from './NewProductForm.module.css';
import NewVariationForm from './variations/NewVariationForm';
import Spinner from '../layout/spinner';
import VariationsList from './variations/VariationsList';
import ImageElement from './images/ImageElement';

function NewProductForm() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [productLines, setProductLines] = useState([]);
    const [types, setTypes] = useState([]);
    const [showVariation, setShowVariation] = useState(false);
    const [product, setProduct] = useState({});
    const [variations, setVariations] = useState([]);
    const [images, setImages] = useState([]);

    const productLineInputRef = useRef();
    const typeInputRef = useRef();
    const configCodeInputRef = useRef();
    const titleInputRef = useRef();

    useEffect(() =>{
        fetchHandler();
    }, []);

    async function fetchHandler() {
        const types = await axios.get('/api/products/taxonomy');
        const filteredTypes = types.data.filter(type => type.area === 'CabType');
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

    function variationClick(e) {
        e.preventDefault();
        const generic = {
            productLine: productLineInputRef.current.value,
            category: typeInputRef.current.value,
            // configCode: configCodeInputRef.current.value,
            title: titleInputRef.current.value,
            images
        };
        setProduct(generic);
        setShowVariation(!showVariation);
    };

    function addImageHandler(image) {
        setImages([...images, image]);
    };

    async function removeImageHandler(e) {
        e.preventDefault();
        setImages(images.filter((image) => image.public_id !== e.target.id));
        const response = await axios.delete('/api/images/' + e.target.id);
    };

    const formDetail = (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor="productLine">Product Line</label>
                <select name='productLine' required ref={productLineInputRef}>
                    {productLineOptions}
                </select>
                <label htmlFor="type">Cabinet Type</label>
                <select name='type' required ref={typeInputRef}>
                    {typeOptions}
                </select>
                {/* <label htmlFor="configCode">Generic Code</label>
                <input type='text' required id='configCode' ref={configCodeInputRef} /> */}
                <label htmlFor="title">Title</label>
                <input type='text' required id='title' ref={titleInputRef} />
                <ImageElement images={images} addImage={addImageHandler} deleteImage={removeImageHandler} />
            </div>
        </form>
    )

    const variationButton = (
        <div className={classes.actions}>
            <button onClick={variationClick}>Add Variation</button>
        </div>
    );

    async function addVariationHandler(variation) {
        console.log(product);
        const newProduct = await axios.post('/api/products', product);
        console.log(newProduct);
        const res = await axios.post('/api/products/' + newProduct.data._id + '/variations', variation);
        setShowVariation(false);
        router.replace('/products/' + newProduct.data._id);
    };

    const submitButton = (
        <div className={classes.actions}>
            <button onClick={submitHandler}>Add Cabinet(s)</button>
        </div>
    );

    async function submitHandler() {
        setIsLoading(false);
        const data = genericProduct;

        const newProduct = await axios.post('/api/products', data);

        variations.map(async(variation) => {
            const newVariation = await axios.post('/api/products/' + newProduct.data._id + '/variations', variation);
        });

        images.map(async(image) => {
            const newImage = await axios.post('/api/products/' + newProduct.data._id + '/images', image);
            console.log(newImage);
        });

        router.push('/products');
    }

    return (
        <div>
            {isLoading && <div className={classes.spinner}><Spinner /></div> || formDetail}
            {/* {variations.length > 0 && <div className={classes.varList}><VariationsList variations={variations} /></div>} */}
            <div className={classes.variation}>
                {showVariation && <NewVariationForm product={product} addVariation={addVariationHandler} />}
            </div>
            {!isLoading && !showVariation && variationButton}
            {variations.length > 0 && submitButton}
        </div>
    )
};

export default NewProductForm;