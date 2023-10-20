import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import { H2 } from "../../components/Styles.css";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";

function ProductList() {
  const { products, loading } = useSelector((state) => state.products);

  const renderProducts = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      );
    } else if (products.length > 0) {
      return (
        <div className='product-thumbnail-grid'>
					{products.map((product, i) => {
						return (
							<ProductThumbnail key={i} product={product} /> 
						)
					})}
				</div>
      );
      {/* <ImageList cols={3} rowHeight={164}>
        {products.map((product, i) => (
          <ImageListItem key={i}>
            <img
              srcSet={`${product?.images[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${product?.images[0]}?w=164&h=164&fit=crop&auto=format`}
              alt={product.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    } else {
      return <H2>No se encontraron productos para tu busqueda</H2>;
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        {renderProducts()}
      </Box>
    </>
  );
}

export default ProductList;
