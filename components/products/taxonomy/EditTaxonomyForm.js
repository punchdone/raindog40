import { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from 'axios';

import Modal from "../../ui/Modal";
import classes from "./EditTaxonomyForm.module.css";
import RateModule from './rates/RateModule';

const EditTaxonomyForm = (props) => {
  const [item, setItem] = useState(props.item[0]);
  const [rates, setRates] = useState(props.item[0].rates)

//   console.log(props.uom);

  const areaOptions = props.areas.map((area) => (
    <MenuItem key={area.index} value={area.area}>
      {area.area}
    </MenuItem>
  ));

  const handleAreaChange = (e) => {
      setItem({...item, area: e.target.value});
  };

  const handleTitleChange = (e) => {
      setItem({...item, area: e.target.value});
  };

  const handleSubmit = async () => {
    const data = {
        area: item.area,
        title: item.title,
        rates
    }
    console.log(data);
    const updatedItem = await axios.put('/api/taxonomy/' + item._id, data);
    console.log(updatedItem.data);
    props.onClose();
  }

  const addRateHandler = (rate, uom) => {
    setRates([...rates, {rate, uom}]);
    // setElement([...element.rates, {rate,uom}]);
    // props.addRate()
};

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.taxonomy}>
        <FormControl>
          <InputLabel id="taxonomy-area-label" htmlFor="taxonomy-area">
            Taxonomy Area
          </InputLabel>
          <Select
            labelId="taxonomy-area-label"
            id="taxonomy-area-select"
            value={item.area}
            label="Area"
            className={classes.areaSelection}
            onChange={handleAreaChange}
          >
            <MenuItem value="none"> </MenuItem>
            {areaOptions}
          </Select>
        </FormControl>
        <FormControl className={classes.element}>
          <InputLabel htmlFor="taxonomy-element">Taxonomy Element</InputLabel>
          <Input
            id="taxonomy-element"
            // aria-description="Taxonomy element"
            value={item.title}
            onChange={handleTitleChange}
          />
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit}>Update</Button>
        <Button variant="outlined" onClick={props.onClose}>
          Close
        </Button>
      </div>
      <div className={classes.rates}><RateModule uom={props.uom} rates={rates} addRateHandler={addRateHandler} /></div>
    </Modal>
  );
};

export default EditTaxonomyForm;
