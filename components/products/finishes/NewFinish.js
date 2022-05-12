import { useState } from 'react';
import {
    Grid,
    // GridItem,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    FormGroup,
    Checkbox,
    Radio,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText
    // Paper,
} from '@mui/material';
import axios from 'axios';

const NewFinish = ({ types, materials, stockingLevels, productLines }) => {
    const [formValues, setFormValues] = useState({
        finishName: '',
        materials: [],
        stockingLevel: '',
        finishType: '',
        productLines: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleMaterialInputChange = (e) => {
        const { value, checked } = e.target;
        const { materials } = formValues;
        console.log(`${value} is ${checked}`);

        if (checked) {
            setFormValues({...formValues,
                materials: [...materials, value]
            })
        } else {
            setFormValues({...formValues,
                materials: materials.filter((e) => e !== value)
            })
        }
    };

    const handleProductLineInputChange = (e) => {
        const { value, checked } = e.target;
        const { productLines } = formValues;

        if (checked) {
            setFormValues({...formValues,
                productLines: [...productLines, value]
            })
        } else {
            setFormValues({...formValues,
                productLines: productLines.filter((e) => e !== value)
            })
        }
    };

    const stockingRadios = stockingLevels.map((stockingLevel) => (
        <FormControlLabel
            key={stockingLevel._id}
            value={stockingLevel._id}
            control={<Radio size='small' />}
            label={stockingLevel.title}
        />
    ));

    const typeOptions = types.map((type) => (
        <MenuItem key={type._id} value={type._id}>
            {type.title}
        </MenuItem>
    ));

    const materialSwitches = materials.map((material) => (
        <FormControlLabel
            key={material._id}
            control={<Checkbox onChange={handleMaterialInputChange} name='materials' value={material._id} />
        }
            label={material.title}
        />
    ));

    const productLinesCheckboxes = productLines.map((productLine) => (
        <FormControlLabel
            key={productLine._id}
            control={<Checkbox onChange={handleProductLineInputChange} name='productLines' value={productLine._id} />
        }
            label={productLine.title}
        />
    ));

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('formValues', formValues);
        const newFinish = await axios.post('/api/products/finishes', formValues);
        console.log(newFinish);
    }

    return (
        <form submit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid>
                {/* <GridItem> */}
                    <TextField 
                        id='finish-name'
                        name='finishName'
                        label='Finish Name'
                        type='text'
                        value={formValues.finishName}
                        onChange={handleInputChange}
                    />
                </Grid>
                {/* </GridItem> */}
                <FormControl>
                    <FormLabel>Stocking Level</FormLabel>
                    <RadioGroup
                        name='stockingLevel'
                        value={formValues.stockingLevel}
                        onChange={handleInputChange}
                        column
                    >
                        {stockingRadios}
                    </RadioGroup>
                </FormControl>
                <FormControl>
                <InputLabel id="finish-type-label">Finish Type</InputLabel>
                    <Select
                    labelId="finish-type-label"
                    id="finish-type-select"
                    name='finishType'
                    label="Finish Type"
                    onChange={handleInputChange}
                    >
                    <MenuItem value="none"></MenuItem>
                    {typeOptions}
                    </Select>
                    <FormHelperText>What is the finish type?</FormHelperText>
                </FormControl>
                <FormControl component='fieldset' variant='standard'>
                    <FormLabel component='legend'>Product Lines</FormLabel>
                        <FormGroup>
                            {productLinesCheckboxes}
                        </FormGroup>
                </FormControl>
                <FormControl component='fieldset' variant='standard'>
                    <FormLabel component='legend'>Materials</FormLabel>
                        <FormGroup>
                            {materialSwitches}
                        </FormGroup>
                </FormControl>
            </Grid>
            <Button variant='outlined' type='submit'>Add Finish</Button>
            {console.log(formValues)}
        </form>
    )
};

export default NewFinish;