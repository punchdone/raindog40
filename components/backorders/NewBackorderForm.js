import { useRef, useState, useEffect } from "react";
// import backorderStatus from "../../model/Backorder/status";

import Card from "../ui/Card";
import classes from "./NewBackorderForm.module.css";

function NewBackorderForm(props) {
  const [channels, setChannels] = useState([]);
  const [geographies, setGeographies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHandler();
  }, []);

  async function fetchHandler() {
    console.log('fetchHandler ran!');
    try {
      let [channels, geographies, vendors] = await Promise.all([
        fetch('https://live-raindog.pantheonsite.io/api/channel'),
        fetch('/api/geography'),
        fetch('/api/vendors'),
      ]);

      const channelData = await channels.json();
      const geographyData = await geographies.json();
      const vendorsData = await vendors.json();

      // console.log(channelData);
      // console.log(geographyData);
      // console.log(vendorsData);

      setChannels(channelData);
      setGeographies(geographyData);
      setVendors(vendorsData);
      setIsLoading(false);
      // setBackorderStatus(statusData);

    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    
  };

  

  let content = <p>Found no partner companies.</p>;

  if (channels.length > 0) {
      content = '';
  }

  const channelOptions = channels.map(channel =>
    <option key={channel.nid} value={channel.nid}>{channel.code} - {channel.company}</option>
  );

  const geographyOptions = geographies.map(geography =>
    <option key={geography._id} value={geography._id}>{geography.areaName}</option>
  );

  const vendorOptions = vendors.map(vendor => 
    <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
  );

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const dateInputRef = useRef();
  const poInputRef = useRef();
  const nameInputRef = useRef();
  const itemInputRef = useRef();
  const quantityInputRef = useRef();
  // const shippedInputRef = useRef();
  // const receivedInputRef = useRef();
  const notesInputRef = useRef();
  const channelInputRef = useRef();
  const geographyInputRef = useRef();
  const vendorInputRef = useRef();
  const projectNumInputRef = useRef();
  const orderedInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredDate = new Date().toLocaleString();
    const enteredPo = poInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredItem = itemInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;
    // const enteredShipped = shippedInputRef.current.value;
    // const enteredRecevied = receivedInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredChannel = channelInputRef.current.value;
    const enteredGeography = geographyInputRef.current.value;
    const enteredVendor = vendorInputRef.current.value;
    const enteredProjectNum = projectNumInputRef.current.value;
    const enteredOrdered = orderedInputRef.current.checked;

    console.log(enteredOrdered);

    let backorderStatus = '';
    enteredOrdered && (backorderStatus = '622bbba5cc9bb25105fab860') || (backorderStatus = '622bbb99cc9bb25105fab85e');
    // if (enteredOrdered) {
    //   const ;
    //   const orderedDate = new Date().toLocaleString();
    // } else {
    //   const ;
    //   const orderedDate = null
    // };

    console.log(backorderStatus);

    const backorderData = {
      createdDate: enteredDate,
      vendor: enteredVendor,
      po: enteredPo,
      projectNum: enteredProjectNum,
      channel: enteredChannel,
      projectName: enteredName,
      item: enteredItem,
      quantity: enteredQuantity,
      identified: true,
      identifiedDate: new Date().toLocaleString(),
      ordered: enteredOrdered,
      orderedDate: (enteredOrdered && new Date() || null),
      received: false,
      receivedDate: null,
      scheduled: false,
      scheduledDate: null,
      shipped: false,
      shippedDate: null,
      completed: false,
      completedDate: null,
      backorderStatus,
      geography: enteredGeography,
      notes: enteredNotes
    };

    props.onAddBackorder(backorderData);
  }

  return (
    <Card>
      <section>{content}</section>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* <div className={classes.control}>
          <label htmlFor="date">Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div> */}
        <div className={classes.control}>
          <label htmlFor="vendor">Vendor</label>
          <select required ref={vendorInputRef}>
            {vendorOptions}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="po">RW PO#</label>
          <input type="text" required id="po" ref={poInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='ordered'>Ordered?</label>
          <input className={classes.orderCheckbox} type='checkbox' ref={orderedInputRef} id='ordered' />
        </div>
        <div className={classes.control}>
          <label htmlFor="projectNum">Project #</label>
          <input type="text" required id="projectNum" ref={projectNumInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="channel">Channel</label>
          <select required ref={channelInputRef}>
            {channelOptions}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Project Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="item">Item</label>
          <input type="text" required id="item" ref={itemInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" required id="quantity" min="1" ref={quantityInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="geography">Geography</label>
          <select required ref={geographyInputRef}>
            {geographyOptions}
          </select>
        </div>
        {/* <div className={classes.control}>
          <label htmlFor="shipped">Shipped</label>
          <input type="date" id="shipped" ref={shippedInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="received">Received</label>
          <input type="date" id="received" ref={receivedInputRef} />
        </div> */}
        <div className={classes.control}>
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" required rows="5" ref={notesInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Backorder</button>
        </div>
      </form>
    </Card>
  );
}

export default NewBackorderForm;
