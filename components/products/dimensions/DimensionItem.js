import { useEffect, useState } from 'react';
import { taxonomyLookup } from '../../../helpers/Lookups';

import classes from './DimensionItem.module.css';

function DimensionItem(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [direction, setDirection] = useState();

    // let direction = 'up';

    useEffect(() => {
        lookupFunc(props.dimension.direction)
    }, []);

    const lookupFunc = async (directionCode) => {
        const direction = await taxonomyLookup(directionCode);
        // console.log(direction);
        setDirection(direction);
        setIsLoading(false);
    };

    // const dimensionLine =
    //     // <div>
    //     //     <div>{direction}</div>
    //     //     <div>{props.dimension.standard}</div>
    //     //     <div>{props.dimension.min}</div>
    //     //     <div>{props.dimension.max}</div>
    //     //     <div><input type='checkbox' checked={props.dimension.fixed} /></div>
    //     // </div>
    //     <div>This is nothing!</div>

    return (
        <div>
            {isLoading && <div>Is Loading</div> ||
            <div className={classes.dimensions}>
                <div>{direction}</div>
                <div>{props.dimension.standard}</div>
                <div>{props.dimension.min}</div>
                <div>{props.dimension.max}</div>
                <div><input type='checkbox' checked={props.dimension.fixed} readOnly /></div>
            </div>
            }
        </div>
    )
};

export default DimensionItem;