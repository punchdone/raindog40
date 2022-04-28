// import { useState } from "react";
import { useRouter } from 'next/router';
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./CatalogItem.module.css";

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

function CatalogItem(props) {
  const router = useRouter();
    // const [modalIsShown, setModalIsShown] = useState(false);
    // const [target, setTarget] = useState();

    // function showVariationsHandler(e) {
    //     e.preventDefault();
    //     console.log(props.product._id);
    //     setTarget(props.product._id);
    //     setModalIsShown(true);
    //   };
    
    //   function hideVariationsHandler() {
    //     setModalIsShown(false);
    //   };

    function editHandler(e) {
      e.preventDefault();
      // console.log(props.productId);
      router.push('/products/' + props.productId)
    }

  return (
    <Card 
        sx={{ minWidth: 175 }} 
        className={classes.item}
        // onMouseEnter={showVariationsHandler}
        // onMouseLeave={hideVariationsHandler}
    >
      {props.product.images.length > 0 && (
        <CardMedia
          component="img"
          height="140"
          image={props.product.images[0].url}
          alt={props.product.images[0].public_id}
        />
      )}
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.product.category.title}
        </Typography> */}
        <Typography variant="h5" component="div">
          {props.product.configCode}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.product.title}
        </Typography>
        <Typography variant="body2">
          {/* well meaning and kindly.
                <br />
                {'"a benevolent smile"'} */}
                {props.product.notes}
        </Typography>
      </CardContent>
      <CardActions onClick={props.action}>
        <Button size="small">{props.actionTitle}</Button>
        <Button id={props.product._id} size="small" onClick={editHandler}>Edit</Button>
      </CardActions>
    </Card>
  );
}

export default CatalogItem;
