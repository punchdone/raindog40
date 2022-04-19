import Card from '../../ui/Card';
import classes from './DimensionTable.module.css';
// import DimensionItem from './DimensionItem';
import DimensionForm from './DimensionForm';
import DimensionItem from './DimensionItem';

function DimensionTable(props) {

    const dimensions = props.dimensions;

    console.log(dimensions);

    const addDimensionHandler = (dimension) => {
        props.loadDimension(dimension);
    };

    let dimensionLines = !dimensions && 'No dimensions provided (yet).' ||
        dimensions.map((dimension) =>
            <DimensionItem dimension={dimension} />
        );

    return (
        <Card>
            <div className={classes.listBlock}>
                <div className={classes.header}>
                    <label>Direction</label>
                    <label>Standard</label>
                    <label>Minimum</label>
                    <label>Maximum</label>
                    <label>Fixed</label>
                    <label></label>
                </div>
                {dimensionLines}
                <DimensionForm addDimension={addDimensionHandler} />
            </div>
        </Card>
    )
};

export default DimensionTable;