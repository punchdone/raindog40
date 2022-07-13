import { useState, useRef } from "react";
import dayjs from 'dayjs';

import classes from "./BackorderItemEdit.module.css";
import Modal from "../ui/Modal";

const BackorderItemEdit = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [backorder, setBackorder] = useState({});
  const [channels, setChannels] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [geographies, setGeographies] = useState([]);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState({
    orderedDate: '',
    scheduledDate: '',
    shippedDate: '',
    completedDate: ''
  });
  // const [status, setStatus] = useState();
  const [statusOptions, setStatusOptions] = useState([]);

  const nameInputRef = useRef();
  const numberInputRef=useRef();
  const poInputRef = useRef();
  const itemInputRef = useRef();
  const qtyInputRef = useRef();
  const orderedInputRef = useRef();
  const receivedInputRef = useRef();
  const scheduledInputRef = useRef();
  const shippedInputRef = useRef();
  const completedInputRef = useRef();
  const notesInputRef = useRef();
  const channelInputRef = useRef();
  const vendorInputRef = useRef();
  const geographyInputRef = useRef();

  // console.log(props.backorderLine);

  // useEffect(() => {
  //   backorderLookup(props.backorderLine);
  //   console.log(statusOptions);
  // }, []);

  const backorderLookup = async (backorderId) => {
    const backorderUrl = '/api/backorders/' + backorderId;
    // console.log(backorderUrl);
    try {
      let [backorder, channels, vendors, geographies, statuses] = await Promise.all([
        fetch(backorderUrl),
        fetch('https://live-raindog.pantheonsite.io/api/channel'),
        fetch('/api/vendors'),
        fetch('/api/geography'),
        fetch('/api/backorders/status')
      ]);

      const backorderData = await backorder.json();
      const channelData = await channels.json();
      const vendorData = await vendors.json();
      const geographyData = await geographies.json();
      const statusData = await statuses.json();

      // console.log(backorderData);
      // console.log(channelData);
      // console.log(vendorData);
      // console.log(geographyData);

      const sortedStatuses = statusData.sort((a,b) => {
        return a.order - b.order;
      });
      // console.log(sortedStatuses);
      const fullStatus = sortedStatuses.map((status) => 
        // ({ ...status, checked: backorderData[status.name], date: backorderData[status.name + 'Date'] })
        // console.log(status.name)
        ({...status, date: backorderData[status.name + 'Date'], checked: backorderData[status.name] })
        // ({ ...status, checked: backorderData[status.name] })
      );
      // console.log(fullStatus);

      // const extendStatuses = sortStatuses.map(obj => (
      //   ({ ...obj, checked: backorderDate[obj.name] })
      // ))
      // console.log(extendStatuses);

      
      setStatusOptions(fullStatus);

      setBackorder(backorderData);
      setChannels(channelData);
      setVendors(vendorData);
      setGeographies(geographyData);
      setIsLoading(false);


      setDates({
        orderedDate: backorderData.orderedDate,
        receivedDate: backorderData.receivedDate,
        scheduledDate: backorderData.scheduledDate,
        shippedDate: backorderData.scheduledDate,
        completedDate: backorderData.completedDate
      });
      // setStatus(backorderData.backorderStatus);

    } catch (err) {
      setError(err.message);
    }
  };

  // console.log(backorder.received);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredOrdered = orderedInputRef.current.checked;
    const enteredReceived = receivedInputRef.current.checked;
    const enteredScheduled = scheduledInputRef.current.checked;
    const enteredShipped = shippedInputRef.current.checked;
    const enteredCompleted = completedInputRef.current.checked;
    const enteredQuantity = qtyInputRef.current.value;

    console.log('submitted form!');
    console.log('status = ' + status);
    console.log('ordered = ' + enteredOrdered);
    console.log('orderedDate = ' + dates.orderedDate);
    console.log('received = ' + enteredReceived);
    console.log('receivedDate = ' + dates.receivedDate);
    console.log('scheduled = ' + enteredScheduled);
    console.log('scheduledDate = ' + dates.scheduledDate);
    console.log('enteredQuantity = ' + enteredQuantity);
  };

  const channelOptions = channels.map((channel) => (
    <option key={channel.nid} value={channel.nid}>
      {channel.code} - {channel.company}
    </option>
  ));

  const vendorOptions = vendors.map((vendor) => (
    <option key={vendor._id} value={vendor._id}>
      {vendor.name}
    </option>
  ));

  const geographyOptions = geographies.map((geography) => (
    <option key={geography._id} value={geography._id}>
      {geography.areaName}
    </option>
  ));

  const handleChannelChange = (e) => {
    setBackorder((prevState) => {
      return { ... prevState, channel: e.target.value }
    });
  };

  const handleVendorChange = (e) => {
    setBackorder((prevState) => {
      return { ... prevState, vendor: e.target.value }
    });
  };

  const handleGeographyChange = (e) => {
    setBackorder((prevState) => {
      return { ... prevState, geography: e.target.value }
    });
  };

  const changeDateHandler = e => {
    console.log('Date changed!');
    console.log('e.target.id = ' + e.target.id);
    console.log('target.name = ' + e.target.name);
    // console.log(backorder.received);
    console.log('target.checked = ' + e.target.checked);
    const postDate = 
      !e.target.checked && new Date(0) || new Date().toLocaleString();
    console.log(postDate);
    console.log(statusOptions);
    let options = [...statusOptions];

    setStatusOptions(prevState => ({
      statusOptions: {
        ...prevState.statusOptions,
        [prevState.statusOptions[e.target.name - 1].checked]: e.target.checked
      }
    }));

    // let update = [
    //   { 'name': e.target.id },
    //   {}
    // ]

    // let option = options[e.target.name - 1], 
    //   checked: e.target.checked,
    //   date: postDate
    // };
    console.log(option);
    options[e.target.name - 1] = option;
    console.log(options);

    setStatusOptions( ...statusOptions, { [e.target.id] : e.target.checked } );

    // setStatusOptions({ ...statusOptions, options });
    
    // setStatusOptions(({...prevState}) => {
    //   statusOptions[e.target.name - 1] = statusOption
    // });
    // const arrayLocation = e.target.name - 1;
    // setStatusOptions(prevState => ({
    //   statusOptions :{
    //     ...prevState.statusOptions,
    //     [prevState.statusOptions[arrayLocation].checked]: e.target.checked,
    //     [prevState.statusOptions[arrayLocation].date]: postDate
    //   },
    // }));
    // setStatusOptions((prevState) => {
    //   return { ...prevState, statusOptions[e.target.name][e.target.id]: e.target.checked}
    // });

    // [e.target.name]: e.target.checked

    // setStatusOptions({ ...statusOptions });

    // e.target.id === 'completed' &&
    //   setStatus('622bbab7cc9bb25105fab859');
    // e.target.id === 'shipped' &&
    //   setStatus('622bbbd1cc9bb25105fab866');
    // e.target.id === 'scheduled' &&
    //   setStatus('622bbbc0cc9bb25105fab864');
    // e.target.id === 'received' &&
    //   setStatus('622bbbb1cc9bb25105fab862');
    // e.target.id === 'ordered' &&
    //   setStatus('622bbba5cc9bb25105fab860');

    // setDates({ ...dates, [e.target.name]: postDate});
    // setBackorder({...backorder, [e.target.id]: e.target.checked});

  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button-alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} type="submit">
        Update
      </button>
    </div>
  );

  const statusCheckboxes = statusOptions.map((statusOptions) => (
    <div key={statusOptions.name} className={classes.items}>
        <label 
            htmlFor={statusOptions.name} 
            className={classes.label}
        >
          {statusOptions.name.charAt(0).toUpperCase() + statusOptions.name.slice(1)}
        </label>
        <input
          type="checkbox"
          id={statusOptions.name}
          // className={classes.formy}
          checked={statusOptions.checked}
          // ref={statusOptions.name + 'InputRef'}
          name={statusOptions.order}
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{statusOptions.date && dayjs(statusOptions.date).format('M/D/YY')}</p>
      </div>
  ));
    

  const modalEditContent = (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.items}>
        <label 
            htmlFor="projectNum" 
            className={classes.label}
        >
          Project#
        </label>
        <input
          type="text"
          id="projectNum"
          className={classes.formy}
          defaultValue={backorder.projectNum}
          ref={numberInputRef}
        />
      </div>
      <div className={classes.items}>
        <label htmlFor="channel" className={classes.label}>
          Channel
        </label>
        <select
          className={classes.formy}
          ref={channelInputRef}
          value={backorder.channel}
          onChange={handleChannelChange}
        >
          {channelOptions}
        </select>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="name" 
            className={classes.label}
        >
          Project Name
        </label>
        <input
          type="text"
          id="name"
          className={classes.formy}
          defaultValue={backorder.projectName}
          ref={nameInputRef}
        />
      </div>
        {/* <label 
            htmlFor="created-date" 
            className={classes.label}
        >
          Created Date
        </label>
        <input
          type="date"
          id="created-date"
          className={classes.formy}
          defaultValue={backorder.date}
          ref={dateInputRef}
        /> */}
      <div className={classes.items}>
        <label htmlFor="vendor" className={classes.label}>
          Vendor
        </label>
        <select
          className={classes.formy}
          ref={vendorInputRef}
          value={backorder.vendor}
          onChange={handleVendorChange}
        >
          {vendorOptions}
        </select>
      </div>
      <div className={classes.items}>  
        <label 
            htmlFor="po" 
            className={classes.label}
        >
          PO#
        </label>
        <input
          type="text"
          id="po"
          className={classes.formy}
          defaultValue={backorder.po}
          ref={poInputRef}
        />
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="item" 
            className={classes.label}
        >
          Item
        </label>
        <input
          type="text"
          id="item"
          className={classes.formy}
          defaultValue={backorder.item}
          ref={itemInputRef}
        />
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="qty" 
            className={classes.label}
        >
          Quantity
        </label>
        <input
          type="number"
          id="name"
          className={classes.formy}
          defaultValue={backorder.quantity}
          ref={qtyInputRef}
        />
      </div>
      {statusCheckboxes}
      {/* <div className={classes.items}>
        <label 
            htmlFor="ordered" 
            className={classes.label}
        >
          Ordered
        </label>
        <input
          type="checkbox"
          id="ordered"
          // className={classes.formy}
          checked={backorder.ordered}
          ref={orderedInputRef}
          name='orderedDate'
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{backorder.orderedDate && dayjs(backorder.orderedDate).format('M/D/YY') || (dates.orderedDate && dayjs(dates.orderedDate).format('M/D/YY'))}</p>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="received" 
            className={classes.label}
        >
          Received
        </label>
        <input
          type="checkbox"
          id="received"
          // className={classes.formy}
          checked={backorder.received}
          ref={receivedInputRef}
          name='receivedDate'
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{dates.receivedDate && dayjs(dates.receivedDate).format('M/D/YY')}</p>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="scheduled" 
            className={classes.label}
        >
          Scheduled
        </label>
        <input
          type="checkbox"
          id="scheduled"
          checked={backorder.scheduled}
          ref={scheduledInputRef}
          name='scheduledDate'
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{dates.scheduledDate && dayjs(dates.scheduledDate).format('M/D/YY')}</p>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="shipped" 
            className={classes.label}
        >
          Shipped
        </label>
        <input
          type="checkbox"
          id="shipped"
          name='shippedDate'
          checked={backorder.shipped}
          ref={shippedInputRef}
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{dates.shippedDate && dayjs(dates.shippedDate).format('M/D/YY')}</p>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="completed" 
            className={classes.label}
        >
          Completed
        </label>
        <input
          type="checkbox"
          id="completed"
          name='completedDate'
          checked={backorder.completed}
          ref={completedInputRef}
          onChange={changeDateHandler}
        />
        <p className={classes.planDate}>{dates.completedDate && dayjs(dates.completedDate).format('M/D/YY')}</p>
      </div> */}
      <div className={classes.items}>
        <label htmlFor="geography" className={classes.label}>
          Geography
        </label>
        <select
          className={classes.formy}
          ref={geographyInputRef}
          value={backorder.geography}
          onChange={handleGeographyChange}
        >
          {geographyOptions}
        </select>
      </div>
      <div className={classes.items}>
        <label 
            htmlFor="notes" 
            className={classes.label}
        >
          Notes
        </label>
        <textarea
          id="notes"
          className={classes.formy}
          defaultValue={backorder.notes}
          ref={notesInputRef}
        />
      </div>
      {modalActions}
    </form>
  );

  return (
    <Modal>
      {/* {isLoading && <p>Is loading...</p> || modalEditContent } */}
      {isLoading && <p>Is Loading...</p>}
      {modalEditContent}
    </Modal>
  );
};

export default BackorderItemEdit;
