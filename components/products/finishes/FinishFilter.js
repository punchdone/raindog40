import { useState } from 'react';
import {
    FormHelperText,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Button
  } from "@mui/material";

  import classes from './FinishFilter.module.css';

  function FinishFilter({ types, materials, stocking, productLines, filterHandler }) {
      const [formValues, setFormValues] = useState({
          type: '',
          material: '',
          stocking: ''
      });

    const typeOptions = types.map((type) => (
        <MenuItem key={type._id} value={type._id}>
            {type.title}
        </MenuItem>
    ));

    const materialOptions = materials.map((material) => (
        <MenuItem key={material._id} value={material._id}>
            {material.title}
        </MenuItem>
    ));

    const stockingOptions = stocking.map((stock) => (
        <MenuItem key={stock._id} value={stock._id}>
            {stock.title}
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

    const submitFilter = (event) => {
        event.preventDefaults();
        console.log(formValues);
        // filterHandler(event.target.value);
    };

      return (
        <div className={classes.filter}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="finish-type-label">Finish Type</InputLabel>
                    <Select
                    labelId="finish-type-label"
                    id="finish-type-select"
                    //   value={areaFilter}
                    label="Finish Type"
                    onChange={handleInputChange}
                    >
                    <MenuItem value="none"></MenuItem>
                    {typeOptions}
                    </Select>
                    <FormHelperText>What type of finishes would you like to look at?</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="material-label">Material</InputLabel>
                    <Select
                    labelId="material-label"
                    id="material-select"
                    //   value={areaFilter}
                    label="Material"
                    onChange={handleInputChange}
                    >
                        <MenuItem value="none"></MenuItem>
                        {materialOptions}
                    </Select>
                    <FormHelperText>What type of material would you like to look at?</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="stocking-label">Stocking Level</InputLabel>
                    <Select
                    labelId="stocking-label"
                    id="stocking-select"
                    //   value={areaFilter}
                    label="Stocking Level"
                    onChange={handleInputChange}
                    >
                    <MenuItem value="none"></MenuItem>
                    {stockingOptions}
                    </Select>
                    <FormHelperText>What stocking level would you like to look at?</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="productLine-label">Product Line</InputLabel>
                    <Select
                    labelId="productLine-label"
                    id="productLine-select"
                    //   value={areaFilter}
                    label="productLine"
                    onChange={handleInputChange}
                    >
                    <MenuItem value="none"></MenuItem>
                    {productLineOptions}
                    </Select>
                    <FormHelperText>Which product line are you using?</FormHelperText>
                </FormControl>
                <Button variant='outlined' onClick={submitFilter}>Filter</Button>
        </div>
      )
  }

  export default FinishFilter;