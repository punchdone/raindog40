import { useState, useEffect, Fragment } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    Button
} from '@mui/material';
import axios from 'axios';

const DoorItem = ({ door, onEdit }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [typeTitle, setTypeTitle] = useState();
    const [styleTitle, setStyleTitle] = useState();
    // const [productLineTitle, setProductLineTitle] = useState();

    // console.log(door);

    useEffect(() => {
        fetchHandler();
      }, []);

    const fetchHandler = async() => {
        const typeRes = await axios('/api/taxonomy/' + door.doorType);
        setTypeTitle(typeRes.data.title);
        const styleRes = await axios('/api/taxonomy/' + door.doorStyle);
        setStyleTitle(styleRes.data.title);
        setIsLoading(false);
    };
   
    // console.log(door);

    const onEditClickHandler = (e) => {
        console.log(e.target.id);
        onEdit(e.target.id);
    }
    
    return (
        <Card elevation={3}>
            <CardHeader title={door.doorName} />
            <CardMedia
                component='img'
                height='194'
                image={door.images[0].url}
                alt={door.images[0].public_id}
            />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    <div>Type: {typeTitle}</div>
                    <div>Style: {styleTitle}</div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button id={door._id} size='small' onClick={onEditClickHandler}>Details</Button>
            </CardActions>
        </Card>
    )
};

export default DoorItem;