import { useState } from "react";

import NewSummitOrder from "./NewSummitOrder";
import classes from "./NewSummitRoom.module.css";

function NewSummitRoom(props) {
  const [showOrder, setShowOrder] = useState(false);

  const showOrderHandler = (e) => {
    e.preventDefault();
    setShowOrder(!showOrder);
  };

  const checkboxHandler = (e) => {
    let isChecked = e.target.checked;
    console.log(isChecked);
    console.log(e.target.name);
    
    props.checkAction(e.target.name, isChecked);
  };

  return (
    <div className={classes.list}>
      <div>{props.room.padRoomNum}</div>
      <div>{props.room.roomName}</div>
      <div>{props.room.statusTitle}</div>
      <div>{props.room.orderTypeTitle}</div>
      <div>{props.room.orderRaindogId}</div>
      {(props.room.status === "2" && (
        <div>
          <input
            type="checkbox"
            name={props.room.roomNid}
            onChange={checkboxHandler}
            // value={props.checked}
          />
        </div>
      )) || <div>NA</div>}
      <button onClick={showOrderHandler}>Show order Details</button>
      {showOrder && <NewSummitOrder room={props.room} />}
    </div>
  );
}

export default NewSummitRoom;
