// import { useState } from 'react';

import Card from '../../ui/Card';
import classes from './PricingForm.module.css';

const pricing = {};

function PricingForm(props) {
    // const [pricing, setPricing] = useState({});
    //     priceLevel1: null,
    //     priceLevel2: null,
    //     priceLevel3: null,
    //     priceLevel4: null,
    //     priceLevel5: null,
    //     priceLevel6: null,
    //     priceLevel7: null,
    //     priceLevel8: null
    // });

    // useEffect(() => {
    //     const pricing = new Object();
    // }, []);

    async function pricingUpdate(e) {
        e.preventDefault();
        console.log(pricing);
        const pricingTitle = 'priceLevel' + e.target.id;
        pricing[pricingTitle] = e.target.value;

        // pricing.
        // console.log(e.target.value);
        // const pricingTitle = 'priceLevel' + e.target.id;
        // await setPricing((prevState) => {
        //     return { ...prevState, [pricingTitle]: e.target.value }
        // });
        console.log(pricing);
        props.loadPricing(pricing);
    };


    return (
        <Card>
            <div className={classes.pricing}>
                <div className={classes.level}>
                    <label htmlFor='1'>Level 1</label>
                    <input type="number" id="1" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='2'>Level 2</label>
                    <input type="number" id="2" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='3'>Level 3</label>
                    <input type="number" id="3"onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='4'>Level 4</label>
                    <input type="number" id="4" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='5'>Level 5</label>
                    <input type="number" id="5" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='6'>Level 6</label>
                    <input type="number" id="6" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='7'>Level 7</label>
                    <input type="number" id="7" onChange={pricingUpdate} />
                </div>
                <div className={classes.level}>
                    <label htmlFor='8'>Level 8</label>
                    <input type="number" id="8" onChange={pricingUpdate} />
                </div>
            </div>
        </Card>
        
    )
};

export default PricingForm;