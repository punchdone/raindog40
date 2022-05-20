import { useState } from 'react';
import {
    Container,
    Grid,
    TextField,
    FormHelperText,
    Button
} from '@mui/material';

const StepRoomNew = ({ addRoom }) => {
    const [room, setRoom] = useState();

    const handleInputChange = (e) => {
        setRoom(e.target.value);
    };

    const addRoomHandler = () => {
        // console.log(room); 
        addRoom(room);
        setRoom('');
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <TextField
                        id='room-name'
                        name='roomName'
                        label='Room Name'
                        type='text'
                        value={room}
                        onChange={handleInputChange}
                    />
                    <FormHelperText>What is the name of the room or specific group of cabinets?</FormHelperText>  
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button variant='outlined' size='small' onClick={addRoomHandler}>Add Room</Button>
                </Grid>
            </Grid>

        </Container>

    )
};

export default StepRoomNew;