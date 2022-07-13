import { useState, useEffect, Fragment } from 'react';
import {
    TableRow,
    TableCell,
    Button
} from '@mui/material';
import { GoCheck } from 'react-icons/go';

// import taxonomyLookup from '../../../helpers/Lookups';
import Spinner from '../../layout/spinner';
import axios from 'axios';

const FinishItem = ({ finish }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [finishTypeTitle, setFinishTypeTitle] = useState();
    const [stockingLevelTitle, setStockingLevelTitle] = useState();

    // useEffect(() => {
    //     fetchHandler();
    //   }, []);

    const fetchHandler = async() => {
        const finishResponse = await axios('/api/taxonomy/' + finish.finishType);
        setFinishTypeTitle(finishResponse.data.title);
        const stockingResponse = await axios('/api/taxonomy/' + finish.stockingLevel);
        setStockingLevelTitle(stockingResponse.data.title);
        setIsLoading(false);
    };

    return (
        <Fragment>
        {isLoading && <TableRow><Spinner /></TableRow> ||
        (<TableRow>
            <TableCell>{finish.finishName}</TableCell>
            <TableCell>{finishTypeTitle}</TableCell>
            <TableCell>{stockingLevelTitle}</TableCell>
            <TableCell>{finish.productLines.includes('625da1e4dea081144f6dea14') && <GoCheck />}</TableCell>
            <TableCell>{finish.productLines.includes('625da1e4dea081144f6dea14') && <GoCheck />}</TableCell>
            <TableCell>
                <Button variant='outlined'>Edit</Button>
                <Button variant='outlined'>Deactivate</Button>
            </TableCell>
        </TableRow>)}
        </Fragment>
    )
};

export default FinishItem;