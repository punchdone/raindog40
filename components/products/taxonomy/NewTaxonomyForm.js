import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

import classes from "./NewTaxonomyForm.module.css";

function NewTaxonomyForm(props) {
    const [element, setElement] = useState();
    const [area, setArea] = useState(props.area);
    const [showArea, setShowArea] = useState(false);

    const handleSubmit = () => {
        props.addElement(element, area);
        setElement('');
    };

    const handleElementChange = (e) => {
        console.log(e.target.value);
        setElement(e.target.value);
    };

    const handleAreaChange = (e) => {
        console.log(e.target.value);
        setArea(e.target.value);
    };

    const areaHandler = () => {
        setShowArea(!showArea);
    };

    return (
        <div className={classes.form}>
        {showArea &&
             <FormControl className={classes.control} margin='normal'>
                <InputLabel htmlFor="taxonomy-area">Taxonomy Area Name</InputLabel>
                <Input id="taxonomy-area" aria-describedby="Taxonomy area" onChange={handleAreaChange} value={area} />
                <FormHelperText id="taxonomy-element-helper-text">
                    Label for the taxonomy area.
                </FormHelperText>
            </FormControl>
        }
        <FormControl className={classes.control} margin='normal'>
            <InputLabel htmlFor="taxonomy-element">Element Name</InputLabel>
            <Input id="taxonomy-element" aria-describedby="Taxonomy element" onChange={handleElementChange} value={element} />
            <FormHelperText id="taxonomy-element-helper-text">
            Title of the element.
            </FormHelperText>
        </FormControl>
        <Button variant='outlined' onClick={handleSubmit}>Add Element</Button>
        <Button variant='outlined' onClick={areaHandler}>New Taxonomy</Button>
        </div>
    );
}

export default NewTaxonomyForm;
