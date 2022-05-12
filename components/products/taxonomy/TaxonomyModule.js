import { Fragment, useState } from 'react';
import axios from 'axios';
import _ from "lodash";

import TaxonomyList from './TaxonomyList';
import TaxonomyFilter from './TaxonomyFilter';
import NewTaxonomyForm from './NewTaxonomyForm';
import EditTaxonomyForm from './EditTaxonomyForm';

function TaxonomyModule(props) {
    const [filter, setFilter] = useState();
    const [items, setItems] = useState(props.types);
    const [item, setItem] = useState();
    const [modalIsShown, setModalIsShown] = useState(false);
    const [areas, setAreas] = useState(
        _.chain(props.types)
        .groupBy('area')
        .map((value, key) => ({ area: key, elements: value }))
        .value()
    );

    const filterHandler = (area) => {
        setFilter(area);
        setItems(props.types.filter(type => type.area === area));
    };

    const hideEditFormHandler = () => {
        setModalIsShown(false);
    };

    const addElementHandler = async (elementTitle, area) => {
        // console.log(elementTitle);
        const newItem = await axios.post('/api/taxonomy', {title: elementTitle, area});
        // console.log(newItem);
        setItems([...items, newItem.data]);
    };

    const updateElementHandler = async(element) => {
        console.log(element)
        const updateItem = await axios.put('/api/taxonomy/' + element._id, element);
        console.log(updateItem);
    }

    const deleteElementHandler = async(elementId) => {
        alert('Do you want to delete the element? #' + elementId);
        const res = await axios.delete('/api/taxonomy/' + elementId);
        setItems(items.filter(item => item._id !== elementId));
    };

    const editElementHandler = async(elementId) => {
        setItem(items.filter(item => item._id === elementId));
        setModalIsShown(true);
    };

    const uom = props.types.filter(type => type.area === 'UOM');
 
    return (
        <Fragment>
            {modalIsShown && <EditTaxonomyForm onClose={hideEditFormHandler} areas={areas} item={item} onUpdate={updateElementHandler} uom={uom} />}
            <TaxonomyFilter areas={areas} filterHandler={filterHandler} />
            <TaxonomyList types={items} deleteItem={deleteElementHandler} editItem={editElementHandler} />
            <NewTaxonomyForm area={filter} addElement={addElementHandler} />
        </Fragment>
    )
};

export default TaxonomyModule;