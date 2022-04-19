import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

function ProductList(props) {
  const products = props.products;

  console.log(products);
  console.log(Array.isArray(products));

  const productList = products.map((product) => (
    <ProductItem 
        key={product._id} 
        configCode={product.configCode}
        category={product.category.title}
        subCategory={product.subCategory.title}
        title={product.title} 
    />
  ));

  return (
    <div className={classes.listBlock}>
      <div className={classes.header}>
        <label>Category</label>
        <label>Config Code</label>
        <label>Title</label>
      </div>
      {productList}
    </div>
  );
}

export default ProductList;
