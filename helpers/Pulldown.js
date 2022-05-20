import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const Pulldown = ({
  area,
  areaTitle,
  options,
  value,
  handleInputChange,
  helperText,
}) => {
  const selectOptions = options.filter(option => option.area === area);
  const optionsList = selectOptions.map((item) => (
    <MenuItem key={item._id} value={item._id}>
      {item.title}
    </MenuItem>
  ));
  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id={`${area}-label`}>{areaTitle}</InputLabel>
      <Select
        labelId={`${area}-label`}
        id={`${area}-select`}
        value={value}
        name={area}
        label={areaTitle}
        onChange={handleInputChange}
      >
        <MenuItem value=''></MenuItem>
        {optionsList}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Pulldown;
