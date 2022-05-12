import { useState } from 'react';
import {
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Button,
    Select,
    MenuItem
  } from "@mui/material";

import classes from './NewRateForm.module.css';

function NewRateForm(props) {
    const [rate, setRate] = useState();
    const [rateUOM, setRateUOM] = useState();

    const uomOptions = props.uom.map((uom) => (
        <MenuItem key={uom._id} value={uom._id}>
            {uom.title}
        </MenuItem>
    ));

    const handleRateChange = (e) => {
        setRate(e.target.value)
    };

    const handleUOMChange = (e) => {
        // console.log(e.target.value);
        setRateUOM(e.target.value);
    };

    const addRateHandler = () => {
        props.addRate(rate, rateUOM);
        // setRate('');
        // setRateUOM('');
    };

    return (
        <div className={classes.rateForm}>
            <FormControl>
                <InputLabel>Rate</InputLabel>
                <Input id='rate' type='number' onChange={handleRateChange} value={rate} />
            </FormControl>
            <FormControl className={classes.areaSelection}>
                <InputLabel id="uom-label" htmlFor="uom">
                    UOM
                </InputLabel>
                <Select
                    labelId='uom-label'
                    id="uom"
                    value={rateUOM}
                    label="Area"
                    onChange={handleUOMChange}
                >
                    <MenuItem value="none"></MenuItem>
                    {uomOptions}
                </Select>
            </FormControl>
                <Button variant='outlined' onClick={addRateHandler} >Add Rate</Button>
        </div>
    )
};

export default NewRateForm;