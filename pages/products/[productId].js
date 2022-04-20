import EditProductForm from '../../components/catalog/EditProductForm';

function EditProductPage(props) {
    return (
        <EditProductForm product={props.product} />
    )
};

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/products/${params.productId}`)
    console.log(res);
    const product = await res.json();
    return {
        props: {
            product
        }
    }
};

export default EditProductPage;