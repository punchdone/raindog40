import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

function ProductList(props) {
  const products = props.products;

  const productList = products.map((product) => (
    <ProductItem 
        key={product._id}
        product={product}
        // productId={product._id}
        // configCode={product.configCode}
        // // category={product.category.title}
        // // subCategory={product.subCategory.title}
        // title={product.title}
        // images={product.images}
    />
  ));

  return (
    <div className={classes.listBlock}>
      <div className={classes.header}>
        <label>Image</label>
        <label>Product Line</label>
        <label>Category</label>
        <label>Config Code</label>
        <label>Title</label>
        <label></label>
      </div>
      {productList}
    </div>
  );
}

export default ProductList;
