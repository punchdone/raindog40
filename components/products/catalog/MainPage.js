import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import CatalogItem from "./CatalogItem";
import classes from "./MainPage.module.css";
import VariationsModal from './VariationsModal';
import CatalogFilter from './CatalogFilter';

function MainPage(props) {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [variations, setVariations] = useState();
  const [product, setProduct] = useState();
  const [products, setProducts] =useState(props.products);

  function variationsHandler(e) {
    // console.log(e.target.id);
    const product = products.filter(product => product._id === e.target.id);
    // console.log(product[0].variations);
    setProduct(product);
    setVariations(product[0].variations);
    setModalIsShown(true);
  };

  function hideVariationsHandler() {
    setModalIsShown(false);
  };

  function filterProducts(productLine, category) {
    // console.log(productLine);
    // console.log(category);
    setProducts(props.products);
    // console.log(products);
    // console.log(products.length);
    // console.log(props.products);
    // console.log(props.products.length);

    if (productLine === 'none') {
      // return;
    } else {
      setProducts(props.products.filter(product => product.productLine._id === productLine));
    }

    if (category === 'none') {
      // return;
    } else {
      setProducts(props.products.filter(product => product.category._id === category));
    }

  };

  function filterReset(e) {
    e.preventDefault();
    setProducts(props.products);
  };

  return (
    <Fragment>
    {modalIsShown && <VariationsModal onClose={hideVariationsHandler} variations={variations} product={product}/>}
    <CatalogFilter filter={filterProducts} reset={filterReset} />
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product._id} item xs={6} sm={4} md={2} lg={1}>
          <CatalogItem 
              product={product}
              action={variationsHandler}
              actionTitle='Variations'
          />
        </Grid>
      ))}
    </Grid>
    </Box>
    </Fragment>
  );
}

export default MainPage;
