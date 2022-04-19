import Card from '../../ui/Card';

import classes from './CountForm.module.css';

const count = {};

function CountForm(props) {

    function countUpdate(e) {
        e.preventDefault();
        const countTitle = e.target.id;
        count[countTitle] = e.target.value;
        console.log(count);
        props.loadCounts(count);
    };

    return (
        <Card>
            <div className={classes.counts}>
                <label htmlFor="topDrawer">Top Drawer</label>
                <input type='number' id='topDrawer' onChange={countUpdate} />
                <label htmlFor="lowerDrawer">Lower Drawer</label>
                <input type='number' id='lowerDrawer' onChange={countUpdate} />
                <label htmlFor="door">Door</label>
                <input type='number' id='door' onChange={countUpdate} />
                <label htmlFor="shelf">Shelf</label>
                <input type='number' id='shelf' onChange={countUpdate} />
                <label htmlFor="partition">Partition</label>
                <input type='number' id='partition' onChange={countUpdate} />
                <label htmlFor="finInt">Finished Interior</label>
                <input type='checkbox' id='finInt' onChange={countUpdate} />
                <label htmlFor="faceFrame">Face Frame</label>
                <input type='checkbox' id='faceFrame' onChange={countUpdate} />
                <label htmlFor="angle">Angle</label>
                <input type='number' id='angle' onChange={countUpdate} />
                <label htmlFor="faces">Faces</label>
                <input type='number' id='faces' onChange={countUpdate} />
            </div>
        </Card>
        
    )
};

export default CountForm;