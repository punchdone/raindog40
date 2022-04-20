import ProductList from '../../components/catalog/ProductList';

function ProductCatalog(props) {
    return (
        <ProductList products={props.products} />
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

export default ProductCatalog;