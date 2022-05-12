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

import ImageElement from '../images/ImageElement';
import Modal from '../../ui/Modal';
import classes from './NewDoor.module.css';

const NewDoor = (props) => {
    const [formValues, setFormValues] = useState({
        doorName: '',
        doorType: '',
        doorStyle: '',
        railSize: '',
        productLines: [],
        images: []
    });
    const [images, setImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const doorTypeOptions = props.doorTypes.map((doorType) => (
        <MenuItem key={doorType._id} value={doorType._id}>
            {doorType.title}
        </MenuItem>
    ));

    const doorStyleOptions = props.doorStyles.map((doorStyle) => (
        <MenuItem key={doorStyle._id} value={doorStyle._id}>
            {doorStyle.title}
        </MenuItem>
    ));

    const doorConstOptions = props.doorConstMethods.map((doorConst) => (
        <MenuItem key={doorConst._id} value={doorConst._id}>
            {doorConst.title}
        </MenuItem>
    ));


    const railSizeRadios = props.railSizes.map((railSize) => (
        <FormControlLabel
            key={railSize._id}
            value={railSize._id}
            control={<Radio size='small' />}
            label={railSize.title}
        />
    ));

    const handleProductLineInputChange = (e) => {
        const { value, checked } = e.target;
        const { productLines } = formValues;
        console.log(`${value} is ${checked}`);
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

    const productLinesCheckboxes = props.productLines.map((productLine) => (
        <FormControlLabel
            key={productLine._id}
            control={<Checkbox onChange={handleProductLineInputChange} name='productLines' value={productLine._id} />
        }
            label={productLine.title}
        />
    ));

    function addImageHandler(image) {
        setImages([...images, image]);
        setFormValues({...formValues,
            images: [...images, image]
        })
    };

    async function removeImageHandler(e) {
        e.preventDefault();
        
        setFormValues({...formValues,
            images: images.filter((image) => image.public_id !== e.target.id)
        });
        setImages(images.filter((image) => image.public_id !== e.target.id));

        const response = await axios.delete('/api/images/' + e.target.id);

        console.log(response);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formValues);
        const newDoor = await axios.post('/api/products/doors', formValues);
        console.log(newDoor);
        props.addDoor(newDoor);
        props.onClose();
    }

    return (
        <Modal onClose={props.onClose}>
        
            <form>
            <div className={classes.header}>New Door</div>
            <div className={classes.form}>
                <div className={classes.leftside}>
                    <div className={classes.input}>
                    <TextField
                        id='door-name'
                        name='doorName'
                        label='Door Name'
                        type='text'
                        value={formValues.doorName}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className={classes.input}>
                    <FormControl>
                        <InputLabel id="door-type-label">Door Type</InputLabel>
                            <Select
                            labelId="door-type-label"
                            id="door-type-select"
                            name='doorType'
                            label='Door Type'
                            onChange={handleInputChange}
                            >
                            <MenuItem value="none"></MenuItem>
                            {doorTypeOptions}
                            </Select>
                            <FormHelperText>What type of door?</FormHelperText>
                        </FormControl>
                        </div>
                        <div className={classes.input}>
                        <FormControl>
                        <InputLabel id="door-style-label">Door Style</InputLabel>
                            <Select
                            labelId="door-style-label"
                            id="door-style-select"
                            name='doorStyle'
                            label='Door Style'
                            onChange={handleInputChange}
                            >
                            <MenuItem value="none"></MenuItem>
                            {doorStyleOptions}
                            </Select>
                            <FormHelperText>What style is the door?</FormHelperText>
                        </FormControl>
                        </div>
                        <div className={classes.input}>
                        <FormControl>
                        <InputLabel id="door-construction-label">Door Construction</InputLabel>
                            <Select
                            labelId="door-construction-label"
                            id="door-construction-select"
                            name='doorConstruction'
                            label='Door Construction'
                            onChange={handleInputChange}
                            >
                            <MenuItem value="none"></MenuItem>
                            {doorConstOptions}
                            </Select>
                            <FormHelperText>What kind of construction does it require?</FormHelperText>
                        </FormControl>
                        </div>
                    </div>
                    <div className={classes.rightside}>
                        <div>
                        <FormControl>
                            <FormLabel>Rail Sizes</FormLabel>
                            <RadioGroup
                                name='railSize'
                                value={formValues.railSize}
                                onChange={handleInputChange}
                                column
                            >
                                {railSizeRadios}
                            </RadioGroup>
                        </FormControl>
                        </div>
                        <div>
                        <FormControl component='fieldset' variant='standard'>
                            <FormLabel component='legend'>Product Lines</FormLabel>
                                <FormGroup>
                                    {productLinesCheckboxes}
                                </FormGroup>
                        </FormControl>
                        </div>
                    </div>
                </div>
                    <div className={classes.bottom}>
                        <ImageElement images={images} addImage={addImageHandler} deleteImage={removeImageHandler} />
                        <Button variant='outlined' onClick={handleSubmit}>Add Door</Button>
                        <Button variant='outlined' onClick={props.onClose}>Return</Button>
                    </div>
            
            </form>
        
        </Modal>
    )
};

export default NewDoor;