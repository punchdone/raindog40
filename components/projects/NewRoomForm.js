import { useRef } from 'react';

import classes from './NewRoomForm.module.css';

function NewRoomForm(props) {

    const roomNameInputRef = useRef();
    const orderTypeInputRef = useRef();
    const totalPriceInputRef = useRef();

    const orderTypeOptions = (
        <select ref={orderTypeInputRef}>
            <option key='1' value='1'>Master</option>
            <option key='2' value='2'>ADD/JCO</option>
            <option key='3' value='3'>Blue/Warranty</option>
        </select>
    );

    const addRoomHandler = (e) => {
        e.preventDefault();

        const enteredRoomName = roomNameInputRef.current.value;
        const enteredOrderType = orderTypeInputRef.current.value;
        const enteredTotalPrice = totalPriceInputRef.current.value;

        console.log(enteredRoomName);
        console.log(enteredOrderType);
        console.log(enteredTotalPrice);

        const roomData = {
            roomName: enteredRoomName,
            orderType: enteredOrderType,
            orderTotal: enteredTotalPrice
        };

        console.log(roomData);

        props.addRooms(roomData);
    }

    return (
        <form className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='roomName'>Room Name</label>
                <input type='text' required id='roomName' ref={roomNameInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='orderType'>Order Type</label>
                {orderTypeOptions}
            </div>
            <div className={classes.control}>
                <label htmlFor='totalPrice'>Total Price</label>
                <input type='text' required id='totalPrice' ref={totalPriceInputRef} />
            </div>
            <div className={classes.action}>
                <button>Drop ORD</button>
            </div>
            <div className={classes.actions}>
                <button onClick={addRoomHandler}>+</button>
            </div>
        </form>
    )
};

export default NewRoomForm;