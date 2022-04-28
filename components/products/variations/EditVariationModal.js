import Modal from '../../ui/Modal';
import EditVariationForm from './EditVariationForm';

function EditVariationModal(props) {
    return (
        <Modal onClose={props.onClose}>
            <EditVariationForm product={props.product} variation={props.variation} onClose={props.onClose}/>
        </Modal>
    )
};

export default EditVariationModal;