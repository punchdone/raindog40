// import { useState } from 'react';

import RateList from './RateList';
import NewRateForm from './NewRateForm';

function RateModule(props) {
    // const [rates, setRates] = useState(props.rates);

    // console.log(props.item);

    // const addRateHandler = (rate, uom) => {
    //     setRates([...rates, {rate, uom}]);
    //     props.addRate()
    // };

    return (
        <div>
            <RateList rates={props.rates} uoms={props.uom} />
            <NewRateForm uom={props.uom} addRate={props.addRateHandler} />
        </div>
    )
};

export default RateModule;