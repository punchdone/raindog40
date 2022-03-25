import { useState } from 'react';

import classes from './Select.module.css';

const Select = (props) => {
    // props should include label, options, defaultValue
    const [optionValue, setOptionValue] = useState(props.defaultValue);

    const selectOptions = props.options.map(option => (
            <option key={option.id} value={option.id}>
                {option.value}
            </option>
    ));

    const handleSelectChange = (e) => {
        e.preventDefault();
        setOptionValue(e.target.value);
    };

    return (
        <div className={classes.items}>
            <label htmlFor={props.label} className={classes.label}>
                {props.label}
            </label>
            <select
            className={classes.formy}
            ref={`${props.label} + 'InputRef'`}
            value={optionValue}
            onChange={handleSelectChange}
            >
                {selectOptions}
            </select>
        </div>
    )
};

export default Select;