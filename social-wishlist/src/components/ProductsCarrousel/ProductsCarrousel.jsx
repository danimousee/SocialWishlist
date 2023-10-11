import { useState } from "react";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../SkipProductButton/SkipProductButton";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2 } from "../Styles.css";
import "./ProductsCarrousel.css";
import { Box, CircularProgress } from "@mui/material";

const ProductsCarrousel = () => {
	const [page, setPage] = useState(0);
	const { products, loading } = useSelector((state) => state.products);
	

	const nextPage = () => {
		if (page === products.length - 1) {
			setPage(0);
		} else {
			setPage(page + 1);
		}
	};

  const compressString = (string = "", max) => {
    if (string.length > max) {
      return string.slice(0,max) + "..."
    }
    return string;
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

	return (
		<>
			<div className="carousel-slider">
				<Carousel showThumbs={false} showStatus={false}>
					{products[page]?.images.map((img, i) => (
						<img
							key={i}
							src={img}
							style={{
								objectFit: "cover",
								height: "100%",
								objectPosition: "center center",
							}}
						/>
					))}
				</Carousel>
				<H2 className="product-name">{compressString(products[page]?.name, 80)}</H2>
			</div>
			<div className="button-group" style={{ justifyContent: "space-evenly" }}>
				<AddToWishlistButton onClick={nextPage} />
				<SkipProductButton onClick={nextPage} />
			</div>
		</>
	);
};

export default ProductsCarrousel;
