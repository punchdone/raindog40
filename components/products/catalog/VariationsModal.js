import classes from './VariationsModal.module.css';
import Modal from '../../ui/Modal';
import VariationItem from './VariationItem';

function VariationsModal(props) {
    const variations = props.variations;
    return (
        <Modal onClose={props.onClose}>
            <div className={classes.variations}>
            {/* {console.log(variations)} */}
            {variations.map((variation) => (
                <VariationItem
                    key={variation._id}
                    product={variation}
                    productId={props.product[0]._id}
                    actionTitle='Details'
                />
            ))}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose}>Back to Catalog</button>
            </div>
        </Modal>
    )   
};

export default VariationsModal;