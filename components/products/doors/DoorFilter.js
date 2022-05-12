import { useState } from 'react';
import {
    Container,
    Grid, 
    Button,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    FormHelperText
} from '@mui/material';

import classes from './DoorFilter.module.css';

const DoorFilter = ({ doorTypes, doorStyles, productLines, filterDoors, resetFilter }) => {
    const [formValues, setFormValues] = useState({
        doorType: 'none',
        doorStyle: 'none',
        productLine: 'none'
    });

    const doorTypeOptions = doorTypes.map((doorType) => (
        <MenuItem key={doorType._id} value={doorType._id}>
            {doorType.title}
        </MenuItem>
    ));

    const doorStyleOptions = doorStyles.map((doorStyle) => (
        <MenuItem key={doorStyle._id} value={doorStyle._id}>
            {doorStyle.title}
        </MenuItem>
    ));
    const productLineOptions = productLines.map((productLine) => (
        <MenuItem key={productLine._id} value={productLine._id}>
            {productLine.title}
        </MenuItem>
    ));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };

    const submitFilter = () => {
        filterDoors(formValues);
        // console.log(formValues);
        // filterHandler(event.target.value);
    };

    return (
        <div className={classes.filter}>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="door-type-label">Door Type</InputLabel>
                        <Select
                        labelId="door-type-label"
                        id="door-type-select"
                        value={formValues.doorType}
                        name='doorType'
                        label="Door Type"
                        onChange={handleInputChange}
                        >
                        <MenuItem value="none"></MenuItem>
                        {doorTypeOptions}
                        </Select>
                        <FormHelperText>What type of door would you like to look at?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="door-style-label">Door Style</InputLabel>
                        <Select
                        labelId="door-style-label"
                        id="door-style-select"
                        value={formValues.doorStyle}
                        label="Door Style"
                        name='doorStyle'
                        onChange={handleInputChange}
                        >
                        <MenuItem value="none"></MenuItem>
                        {doorStyleOptions}
                        </Select>
                        <FormHelperText>What style of door would you like to look at?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="product-line-label">Product Line</InputLabel>
                        <Select
                        labelId="product-line-label"
                        id="product-line-select"
                        value={formValues.productLine}
                        label="Product Line"
                        name='productLine'
                        onChange={handleInputChange}
                        >
                        <MenuItem value="none"></MenuItem>
                        {productLineOptions}
                        </Select>
                        <FormHelperText>Doors from what product line?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'left' }}>
                    <Button variant='outlined' onClick={submitFilter}>Filter</Button>
                    <Button variant='outlined' onClick={resetFilter}>Reset</Button>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
};

export default DoorFilter;