import { Fragment, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

import NewDoor from './NewDoor';
import DoorList from './DoorList';
import DoorFilter from './DoorFilter';
import Spinner from '../../layout/spinner';
import classes from './DoorModule.module.css';
import EditDoor from './EditDoor';

const DoorModule = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [doorTypes, setDoorTypes] = useState([]);
    const [doorStyles, setDoorStyles] = useState([])
    const [railSizes, setRailSizes] = useState([]);
    const [productLines, setProductLines] = useState([]);
    const [doorConstMethods, setDoorConstMethods] = useState([])
    const [modalIsShown, setModalIsShown] = useState(false);
    const [editModalIsShown, setEditModalIsShown] = useState(false);
    const [doors, setDoors] = useState(props.doors);
    const [door, setDoor] = useState();

    useEffect(() => {
        fetchHandler();
      }, []);

      const fetchHandler = async () => {
        const types = await axios.get("/api/taxonomy");
        setDoorTypes(types.data.filter((type) => type.area === "DoorType"));
        setDoorStyles(types.data.filter((type) => type.area === "DoorStyle"));
        setRailSizes(types.data.filter((type) => type.area === "RailSize"));
        setProductLines(types.data.filter((type) => type.area === 'ProductLine'));
        setDoorConstMethods(types.data.filter((type) => type.area === 'DoorConstruction'));
        setIsLoading(false);
      };

      const hideEditFormHandler = () => {
        setModalIsShown(false);
        setEditModalIsShown(false);
      };

      const addDoorHandler = () => {
          setModalIsShown(!modalIsShown);
      };

      const filterDoorHandler = ({ doorType, doorStyle, productLine }) => {
        console.log('doorType=', doorType);
        console.log(doors);
        let filteredDoors = doors;
        if (doorType !== 'none') {
            filteredDoors = filteredDoors.filter((door) => door.doorType === doorType);
        } 
        if (doorStyle !== 'none') {
            filteredDoors = filteredDoors.filter((door) => door.doorStyle === doorStyle);
        } 
        if (productLine !== 'none') {
            filteredDoors = filteredDoors.productLine.includes((door) => door.productLine === productLine);
        }
        if (doorType === 'none' && doorStyle === 'none' && productLine === 'none') {
            return setDoors(props.doors);
        }
        console.log('filteredDoors', filteredDoors);
        return setDoors(filteredDoors);
      };

      const resetFilterHandler = () => {
          setDoors(props.doors);
      };

      const additionalDoorHandler = (newDoor) => {
          setDoors([...doors, newDoor]);
      };

      const editClickHandler = (doorId) => {
          setEditModalIsShown(true);
          setDoor(doors.filter(door => door._id === doorId));
      };

      const updatedDoorHandler = async(updatedDoor) => {
        const res = await axios.put('/api/products/doors/' + updatedDoor._id, updatedDoor);
        const updatedDoors = doors.map(door => {
            if (door._id === updatedDoor._id) {
                return updatedDoor;
            }
            return door
        });
        setDoors(updatedDoors);
        setEditModalIsShown(false);
      };
      

    return (
        <Fragment>
            {isLoading && <Spinner /> ||
            (modalIsShown && (
            <NewDoor 
                doorTypes={doorTypes}
                doorStyles={doorStyles}
                railSizes={railSizes}
                productLines={productLines}
                doorConstMethods={doorConstMethods}
                onClose={hideEditFormHandler}
                addDoor={additionalDoorHandler}
            />)) ||
            (editModalIsShown && (
                <EditDoor 
                    doorTypes={doorTypes}
                    doorStyles={doorStyles}
                    railSizes={railSizes}
                    productLines={productLines}
                    doorConstMethods={doorConstMethods}
                    onClose={hideEditFormHandler}
                    door={door}
                    updateDoor={updatedDoorHandler}
                />
            ))
            ||
            <div>
                <div className={classes.list}>
                    <DoorFilter
                        doorTypes={doorTypes}
                        doorStyles={doorStyles}
                        productLines={productLines}
                        filterDoors={filterDoorHandler}
                        resetFilter={resetFilterHandler}
                    />
                    <DoorList 
                        doors={doors} 
                        onEdit={editClickHandler} 
                    />
                    <div className={classes.bottom}>
                        <Button variant='outlined' onClick={addDoorHandler}>Add Door</Button>
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )
};

export default DoorModule;