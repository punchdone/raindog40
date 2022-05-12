import {
    Container,
    Grid
} from '@mui/material';

import DoorItem from './DoorItem';

const DoorList = (props) => {
    // console.log(props.doors);
    return (
        <Container>
            <Grid container spacing={2}>
                {props.doors.map((door) => (
                    <Grid item key={door._id} xs={12} sm={6} md={3} lg={2}>
                        <DoorItem door={door} onEdit={props.onEdit} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
};

export default DoorList;