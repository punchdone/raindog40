import ProductList from '../../components/catalog/ProductList';

function ProductCatalog(props) {
    // console.log(props.products);
    return (
        // <div>A thing!</div>
        <ProductList products={props.products} />
    )
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
    // console.log(products);
    return {
        props: {
            products
        }
    }
};

export default ProductCatalog;