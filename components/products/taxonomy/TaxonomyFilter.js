// import { useState } from 'react';

import {
  FormHelperText,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from "@mui/material";

import classes from "./TaxonomyFilter.module.css";

function TaxonomyFilter({ areas, filterHandler }) {
    // const [areaFilter, setAreaFilter] = useState();

//   const areas = _.chain(types)
//     .groupBy("area")
//     .map((value, key) => ({ area: key, elements: value }))
//     .value();
//   console.log("areas", areas);

// console.log(areas);

  const areaOptions = areas.map((area) => (
    <MenuItem key={area.index} value={area.area}>
      {area.area}
    </MenuItem>
  ));

  const handleChange = (event) => {
    filterHandler(event.target.value);
  };

  return (
    <div className={classes.filter}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="taxonomy-area-label">Area</InputLabel>
        <Select
          labelId="taxonomy-area-label"
          id="taxonomy-area-seelct"
        //   value={areaFilter}
          label="Area"
          onChange={handleChange}
        >
          <MenuItem value="none"></MenuItem>
          {areaOptions}
        </Select>
        <FormHelperText>Select the area you want to focus on.</FormHelperText>
      </FormControl>
    </div>
  );
}

export default TaxonomyFilter;
