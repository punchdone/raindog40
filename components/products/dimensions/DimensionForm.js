import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import classes from "./DimensionForm.module.css";
import Spinner from '../../layout/spinner';

function DimensionForm(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [directions, setDirections] = useState([]);

  const directionInputRef = useRef();
  const standardInputRef = useRef();
  const minimumInputRef = useRef();
  const maximumInputRef = useRef();
  const fixedInputRef = useRef();

  useEffect(() => {
    fetchHandler();
  }, []);

  async function fetchHandler() {
    const types = await axios.get("/api/taxonomy?area=CabType");
    const filteredTypes = types.data.filter(
      (type) => type.area === "Direction"
    );
    setDirections(filteredTypes);
    setIsLoading(false);
  }

  const directionOptions = directions.map((direction) => (
    <option key={direction._id} value={direction._id}>
      {direction.title}
    </option>
  ));

  function addDimensionHandler(e) {
    e.preventDefault();
    const enteredDirection = directionInputRef.current.value;
    const enteredStandard = standardInputRef.current.value;
    const enteredMinimum = minimumInputRef.current.value;
    const enteredMaximum = maximumInputRef.current.value;
    const enteredFix = fixedInputRef.current.checked;

    const dimension = {
      direction: enteredDirection,
      standard: enteredStandard,
      min: enteredMinimum,
      max: enteredMaximum,
      fixed: enteredFix,
    };

    // console.log(dimension);

    props.addDimension(dimension);
  };

  return (
    <TableRow>
      <TableCell>
        <select ref={directionInputRef}>{directionOptions}</select>
      </TableCell>
      <TableCell className={classes.dimension}>
        <input
          type="number"
          id="standard"
          ref={standardInputRef}
        />
      </TableCell>
      <TableCell className={classes.dimension}>
        <input type="number" id="minimum" ref={minimumInputRef} />
      </TableCell>
      <TableCell className={classes.dimension}>
        <input type="number" id="maximum" ref={maximumInputRef} />
      </TableCell>
      <TableCell>
        <input type="checkbox" id="fixed" ref={fixedInputRef} />
      </TableCell>
      <TableCell>
        <button onClick={addDimensionHandler}>
          <AiOutlinePlus />
        </button>
      </TableCell>
    </TableRow>
  )
// };
};

export default DimensionForm;
