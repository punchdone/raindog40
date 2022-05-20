import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormHelperText,
    TextField,
    FormLabel
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';


import Pulldown from '../../../helpers/Pulldown';
import Spinner from '../../layout/spinner';
import NewRoomForm from './NewRoomForm';
import RoomList from './RoomList';

const NewProjectForm = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [channels, setChannels] = useState([]);
    const [taxonomies, setTaxonomies] = useState([]);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({
        channel: '',
        nid: '',
        deliveryGeography: '',
        productLine: '',
        projectName: '',
        rooms: []
    });

    useEffect(() => {
        fetchHandler();
    }, []);

    async function fetchHandler() {
        try {
          let [channels, taxonomies] = await Promise.all([
            fetch('https://live-raindog.pantheonsite.io/api/channel'),
            fetch('/api/taxonomy')
          ]);
    
          const channelData = await channels.json();
          const taxonomyData = await taxonomies.json();
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
        //   setGeographies(geographyData);
          setTaxonomies(taxonomyData);
        //   console.log(geographyData);
        //   console.log(taxonomyData);
          setIsLoading(false);

        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    const channelOptions = channels.map(channel =>
        <MenuItem key={channel.nid} value={channel.nid}>{channel.code} - {channel.company}</MenuItem>
    );
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const addRoomHandler = (data) => {
        // console.log('roomData', data);
        data.roomNum = formValues.rooms.length;
        data.orderStatus = '6286c61008f769208c0bb818';
        const rooms = [...formValues.rooms, data];
        // console.log('addRoomHandler rooms', rooms);
        setFormValues({...formValues,
            'rooms': rooms
        });
    };

   const submitHandler = async(e) => {
       e.preventDefault();
       setIsLoading = true;
       const roomDetails = formValues.rooms;
       delete formValues.rooms;
       console.log('submitHandler channel/projectName', formValues.channel + '/' + formValues.projectName);
       const response = await axios.post('/api/projects/raindog', { 'title': formValues.channel + '/' + formValues.projectName });
       formValues.nid = response.data.nid;
       console.log('submitHandler formValues', formValues);
       const newProject = await axios.post('/api/projects', formValues);
       console.log('newOrderId', newProject.data._id);
       roomDetails.map(async(room) => {
           console.log('submit room', room);
           await axios.post('/api/projects/' + newProject.data._id + '/rooms', room)
       });
       router.push('/projects');
   };

    return (
        <Container>
            {isLoading && <Spinner /> ||
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <h2>New Wynnbrooke or David Bradley Project</h2>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'left' }}>
                    <FormLabel color='info'>Project Information</FormLabel>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl style={{ width: '100%' }}>
                        <InputLabel id='channel-label'>Channels</InputLabel>
                        <Select
                            labelId='channel-label'
                            id='channel'
                            value={formValues.channel}
                            label='Channel'
                            name='channel'
                            onChange={handleInputChange}
                        >
                            <MenuItem value=''></MenuItem>
                            {channelOptions}
                        </Select>
                        <FormHelperText>What is the channel code associated with your designer or builder?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            id='project-name'
                            name='projectName'
                            label='Project Name'
                            type='text'
                            value={formValues.projectName}
                            onChange={handleInputChange}
                        />
                        <FormHelperText>What is the name of your project?</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Pulldown 
                        area='productLine'
                        areaTitle='Product Line'
                        value={formValues.productLine}
                        options={taxonomies}
                        handleInputChange={handleInputChange}
                        helperText='Which product line is this project ordering from?'
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Pulldown
                        area='deliveryGeography'
                        areaTitle = 'Geography'
                        value={formValues.deliveryGeography}
                        options={taxonomies}
                        handleInputChange={handleInputChange}
                        helperText='Which geography is this project in?'
                    />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'left' }}>
                    <FormLabel color='info'>Room List</FormLabel>
                </Grid>
                <RoomList rooms={formValues.rooms} />
                <Grid item xs={12} sx={{ textAlign: 'left' }}>
                    <FormLabel color='info'>Add Rooms</FormLabel>
                </Grid>
                <NewRoomForm 
                    taxonomies={taxonomies}
                    addRooms={addRoomHandler} 
                /> 
                <Grid item xs={12}>
                    <Button variant='outlined' onClick={submitHandler}>Add Project</Button>
                </Grid>
            </Grid>
            }
        </Container>
    )
};

export default NewProjectForm;

// // import { useState, useEffect, useRef, Fragment } from 'react';
// // import axios from 'axios';
// // import { useRouter } from 'next/router';

// // import classes from './NewProjectForm.module.css';
// // import RoomList from './RoomList';
// // import NewRoomForm from './NewRoomForm';
// // import channelCode from '../../../helpers/channel';
// // import Pulldown from '../../../helpers/Pulldown';

// // const roomList = [
// //     {roomName: 'Kitchen Perimeter', orderType: 1, orderCheck: true, orderTotal: 100},
// //     {roomName: 'Master Bath', orderType: 1, orderCheck: true, orderTotal: 1000},
// //     {roomName: 'Den', orderType: 2, orderCheck: true, orderTotal: 1200},
// //     {roomName: 'Laundry', orderType: 1, orderCheck: true, orderTotal: 101.25},
// // ];

// async function NewProjectForm(props) {
//     // const router = useRouter();

//     // const [channels, setChannels] = useState([]);
//     // const [geographies, setGeographies] = useState([]);
//     // const [taxonomies, setTaxonomies] = useState([]);
//     // const [isLoading, setIsLoading] = useState(true);
//     // const [error, setError] = useState(null);
//     // const [rooms, setRooms] = useState([]);
//     // const [productLine, setProductLine] = useState();

//     // const channelInputRef = useRef();
//     // const nameInputRef = useRef();
//     // const geographyInputRef = useRef();
//     // // const productLineInputRef = useRef();

//     // useEffect(() => {
//     //     fetchHandler();
//     // }, []);

//     // async function fetchHandler() {
//     //     try {
//     //       let [channels, geographies, taxonomies] = await Promise.all([
//     //         fetch('https://live-raindog.pantheonsite.io/api/channel'),
//     //         fetch('/api/geography'),
//     //         fetch('/api/taxonomy')
//     //       ]);
    
//     //       const channelData = await channels.json();
//     //       const geographyData = await geographies.json();
//     //       const taxonomyData = await taxonomies.json();
//     //       const filteredChannels = channelData.filter(
//     //           channel => { return channel.type === 'Dealer' }
//     //       );
//     //       const sortedChannels = filteredChannels.sort((a, b) => {
//     //         if (a.code < b.code) {
//     //           return -1;
//     //         }
//     //         if (a.code > b.code) {
//     //           return 1;
//     //         }
//     //         return 0;
//     //       });
    
//     //       setChannels(sortedChannels);
//     //       setGeographies(geographyData);
//     //       setTaxonomies(taxonomyData);
//     //       setIsLoading(true);
    
//     //     } catch (error) {
//     //       setError(error.message);
//     //       console.log(error.message);
//     //     }
        
//     // };

//     // const channelOptions = channels.map(channel =>
//     //     <option key={channel.nid} value={channel.nid}>{channel.code} - {channel.company}</option>
//     //   );
    
//     // const geographyOptions = geographies.map(geography =>
//     //     <option key={geography._id} value={geography._id}>{geography.areaName}</option>
//     // );

//     // // const productLineOptions = (
//     // //     <select ref={productLineInputRef}>
//     // //         <option key='1' value='1'>Summit</option>
//     // //         <option key='2' value='2'>Wynnbrooke</option>
//     // //         <option key='3' value='3'>David Bradley</option>
//     // //         <option key='4' value='4'>Custom</option>
//     // //     </select>
//     // // );

//     // const selectProductLineHandler = (e) => {
//     //     e.preventDefault();
//     //     console.log(e.target.value);
//     //     setProductLine(e.target.value);
//     // }

//     // function addRoomHandler(roomData) {
//     //     roomData.roomNum = rooms.length;
//     //     setRooms((prevState) => [...prevState, roomData]);
//     // };

//     // async function productionSubmitHandler(e) {
//     //     e.preventDefault();
//     //     const name = nameInputRef.current.value;
//     //     const dealerCode = channelInputRef.current.value;
//     //     const channelSym = await channelCode(channelInputRef.current.value);
//     //     // const productLine = productLineInputRef.current.value;
//     //     const geography = geographyInputRef.current.value;
//     //     const projectName = channelSym + '-' + name;
//     //     // console.log(projectName);

//     //     const response = await axios.post('/api/projects/raindog', { 'title': projectName });
//     //     const nid = response.data.nid;
//     //     // console.log(nid);

//     //     const fullProject = await axios('/api/projects/raindog/' + response.data.nid);
//     //     const woProjectNum = fullProject.data.field_wo_project_num.und[0].value;
//     //     // console.log(woProjectNum);

//     //     // console.log(name);
//     //     // console.log(dealerCode);
//     //     // console.log('projectLine = ' + productLine);
//     //     // console.log(geography);
//     //     // console.log(rooms);

//     //     const projectData = {
//     //         nid,
//     //         woProjectNum,
//     //         dealerCode,
//     //         projectName: name,
//     //         productLine,
//     //         geography
//     //     };

//     //     console.log(projectData);

//     //     const newOrder = await axios.post('/api/projects', projectData);
//     //     const newOrderId = newOrder.data._id;
//     //     console.log(newOrderId);

//     //     console.log(rooms);

//     //     rooms.map(async (room) => {
//     //         const roomResponse = await axios.post('/api/projects/' + newOrderId + '/rooms', room)
//     //     });
    
//     //     router.push('/projects');
//     // };
    
//     return (
//         <h2>Fighting the Project Form</h2>
//         // <Fragment>
//         // <h2>New Project</h2>
//         // {isLoading && 
//         //     <Fragment>
//         //         <form className={classes.form}>
//         //             <div className={classes.control}>
//         //                 <label htmlFor="channel">Channel</label>
//         //                 <select required ref={channelInputRef}>
//         //                     {channelOptions}
//         //                 </select>
//         //             </div>
//         //             <div className={classes.control}>
//         //                 <label htmlFor="name">Project Name</label>
//         //                 <input type="text" required id="name" ref={nameInputRef} />
//         //             </div>

//         //             {/* <Pulldown 
//         //                 area='ProductLine'
//         //                 areaTitle='Product Line'
//         //                 value={productLine}
//         //                 options={taxonomies}
//         //                 handleInputChange={selectProductLineHandler}
//         //                 helperText='Which product line is this project ordering from?'
//         //             /> */}

//         //             {/* <div className={classes.control}>
//         //                 <label htmlFor='productLine'>ProductLine</label>
//         //                 {productLineOptions}
//         //             </div> */}
//         //             <div className={classes.control}>
//         //                 <label htmlFor="geography">Geography</label>
//         //                 <select required ref={geographyInputRef}>
//         //                     {geographyOptions}
//         //                 </select>
//         //             </div>
//         //             <div className={classes.actions} onClick={productionSubmitHandler}>
//         //                 <button>Submit to Production</button>
//         //             </div>
//         //         </form>
//         //         <RoomList rooms={rooms}/>
//         //         <NewRoomForm addRooms={addRoomHandler} /> 
//         //     </Fragment>
//         // || <div>Is Loading...</div>}
//         // </Fragment>
//     )
// };

// export default NewProjectForm;