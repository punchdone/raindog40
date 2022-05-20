import {
    Container,
    Grid
} from '@mui/material';

import StepRoomNew from './StepRoomNew';
import StepRoomList from './StepRoomList';
import classes from './StepRoom.module.css';

const StepRoom = ({ rooms, addRoom }) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    Step #2: Identify Rooms/Specification Groups
                </Grid>
                <Grid item xs={12}>
                    <StepRoomList rooms={rooms} />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.newRoom}>
                        <StepRoomNew addRoom={addRoom} />
                    </div>
                </Grid>
            </Grid>
        </Container>
        
    )
};

export default StepRoom;