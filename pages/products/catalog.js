import MainPage from '../../components/products/catalog/MainPage';

function Catalog(props) {
    return (
        <MainPage products={props.products} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
    return {
        props: {
            products
        }
    }
};

export default Catalog;