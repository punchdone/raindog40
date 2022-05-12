import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Spinner from '../../layout/spinner';
import classes from './CatalogFilter.module.css';

const CatalogFilter = (props) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [productLines, setProductLines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productLine, setProductLine] = useState('none');
    const [category, setCategory] = useState('none');

    useEffect(() => {
        fetchHandler();
    }, []);

    const fetchHandler = async() => {
        const types = await axios.get("/api/taxonomy");
        setCategories(types.data.filter((type) => type.area === "CabType"));
        setProductLines(types.data.filter((type) => type.area === "ProductLine"));
        setIsLoading(false);
    };

    const categoryOptions = categories.map((category) => (
        <option key={category._id} value={category._id}>
            {category.title}
        </option>
    ));

    const productLineOptions = productLines.map((productLine) => (
        <option key={productLine._id} value={productLine._id}>
            {productLine.title}
        </option>
    ));

    const filterSubmit = (e) => {
        e.preventDefault();
        // console.log(productLine);
        // console.log(category);
        // console.log(e.target.productLine.value);
        // console.log(e.target.category.value);
        props.filter(productLine, category);
    }

    const filterReset = () => {
        setProductLine('none');
        setCategory('none');
    }

    const productLineHandler = (e) => {
        setProductLine(e.target.value);
    };

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    const options = (
        <form className={classes.filterOptions} onSubmit={filterSubmit}>
            <div className={classes.control}>
                <label htmlFor='productLine'>Product Line</label>
                <select name='productLine' onChange={productLineHandler} value={productLine}>
                    <option value="none"> 
                    </option> 
                    {productLineOptions}
                </select>
            </div>
            <div className={classes.control}>
                <label htmlFor='category'>Product Category</label>
                <select name='category' onChange={categoryHandler} value={category}>
                    <option value="none"> 
                    </option> 
                    {categoryOptions}
                </select>
            </div>
            <div className={classes.actions}>
                <button type='submit'>Filter</button>
                <button onClick={filterReset}>Clear</button>
            </div>
        </form>
    )

    return (
        <div>
        {isLoading && <Spinner /> || options}
        </div>
    )
};

export default CatalogFilter;