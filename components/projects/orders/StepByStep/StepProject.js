import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import axios from 'axios';

import Spinner from '../../../layout/spinner'

const StepProject = ({ taxonomies, project, editProject }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetchHandler();
    }, []);

    const fetchHandler = async() => {
        const channelResponse = await axios('https://live-raindog.pantheonsite.io/api/channel');
        const sortedChannels = channelResponse.data.sort((a, b) => {
            if (a.code < b.code) {
              return -1;
            }
            if (a.code > b.code) {
              return 1;
            }
            return 0;
          });
        setChannels(sortedChannels);
        setIsLoading(false);
    };

    const channelOptions = channels.map(channel => (
        <MenuItem key={channel.nid} value={channel.nid}>{channel.code} - {channel.company}</MenuItem>
    ));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log('value', value);
        editProject(name, value);
    };

    return (
        <Container>
            
                {isLoading && 
                    <Grid container>
                        <Grid item xs={12}><Spinner /></Grid>
                    </Grid> ||
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>Step #1: Project Form</div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl>
                            <InputLabel id="channel-label">Channel</InputLabel>
                                <Select
                                    labelId="channel-label"
                                    id="channel-select"
                                    name='channel'
                                    label='Channel'
                                    value={project.channel}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {channelOptions}
                                </Select>
                                <FormHelperText>Does your contractor or dealer have an account?</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={9}>
                            <TextField
                                id='project-name'
                                name='projectName'
                                label='Project Name'
                                type='text'
                                onChange={handleInputChange}
                                value={project.projectName}
                            />
                            <FormHelperText>What name would you like to use to label your project?</FormHelperText>
                        </Grid>
                    </Grid>
                }
            
        </Container>
    )
};

export default StepProject;