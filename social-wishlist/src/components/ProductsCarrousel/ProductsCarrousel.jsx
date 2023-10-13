import { useState } from "react";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../SkipProductButton/SkipProductButton";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2 } from "../Styles.css";
import "./ProductsCarrousel.css";
import { Box, CircularProgress } from "@mui/material";
import { addProductToUser } from "../../firebase/queries/products";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const ProductsCarrousel = () => {
	const [page, setPage] = useState(0);
	const { products, loading } = useSelector((state) => state.products);
	const { user, loggedIn } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const nextPage = () => {
		if (page === products.length - 1) {
			setPage(0);
		} else {
			setPage(page + 1);
		}
	};

	const compressString = (string = "", max) => {
		if (string.length > max) {
			return string.slice(0, max) + "...";
		}
		return string;
	};

	const handleAddToWishlist = async () => {
		if (loggedIn) {
			try {
				await addProductToUser(db, products[page], user.uid);
				console.log("product," + products[page].id + "added to user");
			} catch (error) {
				// show error dialog? and prompt retry?
			}
			nextPage();
		} else {
			// show dialog to user to login.
			navigate("/login");
		}
	};

	const handleSkipProduct = () => {
		if (loggedIn) {
			nextPage();
		} else {
			navigate("/login");
		}
	};

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
				<CircularProgress color="secondary" />
			</Box>
		);
	}

	return (
		<>
			{products.length > 0 ? (
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
						<AddToWishlistButton onClick={handleAddToWishlist} />
						<SkipProductButton onClick={handleSkipProduct} />
					</div>
				</>
			) : (
				<H2>No se encontraron productos para tu busqueda</H2>
			)}
		</>
	);
};

export default ProductsCarrousel;
