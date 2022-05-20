import { useState } from 'react';
import {
    Container,
    Grid,
    Button
} from '@mui/material';

import StepProject from './StepProject';
import StepRoom from './StepRoom/StepRoom';
import classes from './StepModule.module.css';

const StepModule = ({ taxonomies }) => {
    const [step, setStep] = useState(1);
    const [project, setProject] = useState({
        channel: '',
        projectName: '',
        rooms: []
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const lastStep = () => {
        setStep(step - 1);
    };

    const updateProjectHandler= (name, value) => {
        setProject({
            ...project,
            [name]: value
        });
    };

    const addRoomsHandler = (roomName) => {
        const roomNum = project.rooms.length;
        setProject({
            ...project,
            rooms: [...project.rooms, {roomNum, roomName}]
        });
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <div className={classes.form}>
                    {step === 1 && 
                    <StepProject 
                        taxonomies={taxonomies} 
                        project={project}
                        editProject={updateProjectHandler} />}
                    {step === 2 && 
                        <StepRoom
                            rooms={project.rooms}
                            addRoom={addRoomsHandler}
                        /> 
                    }
                </div>
                <Grid item xs={12}>
                    <div className={classes.button}>
                        {step > 1 && <Button variant='outlined' size='small' onClick={lastStep}>Previous</Button>}
                        {step >= 1 && <Button variant='outlined' size='small' onClick={nextStep}>Next</Button>}
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
};

export default StepModule;