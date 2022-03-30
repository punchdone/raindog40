import { useState, useEffect, useRef, Fragment } from 'react';

import classes from './NewProjectForm.module.css';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';

const roomList = [
    {roomName: 'Kitchen Perimeter', orderType: 1, orderTotal: 100},
    {roomName: 'Master Bath', orderType: 1, orderTotal: 1000},
    {roomName: 'Den', orderType: 2, orderTotal: 1200},
    {roomName: 'Laundry', orderType: 1, orderTotal: 101.25},
];

function NewProjectForm(props) {
    const [channels, setChannels] = useState([]);
    const [geographies, setGeographies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState(roomList);

    const channelInputRef = useRef();
    const nameInputRef = useRef();
    const geographyInputRef = useRef();
    const productLineInputRef = useRef();

    useEffect(() => {
        fetchHandler();
    }, []);

    async function fetchHandler() {
        try {
          let [channels, geographies] = await Promise.all([
            fetch('https://live-raindog.pantheonsite.io/api/channel'),
            fetch('/api/geography')
          ]);
    
          const channelData = await channels.json();
          const geographyData = await geographies.json();
          const filteredChannels = channelData.filter(
              channel => { return channel.type === 'Dealer' }
          );
          const sortedChannels = filteredChannels.sort((a, b) => {
            if (a.code < b.code) {
              return -1;
            }
            if (a.code > b.code) {
              return 1;
            }
            return 0;
          });
    
          setChannels(sortedChannels);
          setGeographies(geographyData);
          setIsLoading(false);
    
        } catch (error) {
          setError(error.message);
          console.log(error.message);
        }
        
    };

    const channelOptions = channels.map(channel =>
        <option key={channel.nid} value={channel.nid}>{channel.code} - {channel.company}</option>
      );
    
    const geographyOptions = geographies.map(geography =>
        <option key={geography._id} value={geography._id}>{geography.areaName}</option>
    );

    const productLineOptions = (
        <select ref={productLineInputRef}>
            <option key='1' value='1'>Summit</option>
            <option key='2' value='2'>Wynnbrooke</option>
            <option key='3' value='3'>David Bradley</option>
            <option key='4' value='4'>Custom</option>
        </select>
    );

    function addRoomHandler(roomData) {
        setRooms((prevState) => [...prevState, roomData]);
    };
    

    return (
        <Fragment>
        <h2>New Project</h2>
        <form className={classes.form}>
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
                <label htmlFor='productLine'>ProductLine</label>
                {productLineOptions}
            </div>
            <div className={classes.control}>
                <label htmlFor="geography">Geography</label>
                <select required ref={geographyInputRef}>
                    {geographyOptions}
                </select>
            </div>
            <div className={classes.actions}>
                <button>Submit to Production</button>
            </div>
        </form>
        <RoomList rooms={rooms}/>
        <NewRoomForm addRooms={addRoomHandler} />
        </Fragment>
    )
};

export default NewProjectForm;