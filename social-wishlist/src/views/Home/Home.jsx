import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import SearchBar from "/src/components/SearchBar/SearchBar";
import AddToWishlistButton from "../../components/AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../../components/SkipProductButton/SkipProductButton";
import "./Home.css";

function Home() {
	const [tab, setTab] = useState("forYou");

	return (
		<div className="main-box">
			<SearchBar />

			<div className="content-box">
				<div className="button-group">
					<button
						className={`btn ${tab === "friends" ? "btn-primary" : "btn-secondary"}`}
						onClick={(e) => setTab("friends")}
					>
						Friends
					</button>
					<button
						className={`btn ${tab === "forYou" ? "btn-primary" : "btn-secondary"}`}
						onClick={(e) => setTab("forYou")}
					>
						For You
					</button>
				</div>

				<div className="product-box">
					<Carousel showThumbs={false} showStatus={false}>
						<img
							src={
								"https://chess.co.uk/cdn/shop/products/classic-staunton-ebonised-chess-set-3-75-king-1-1500px.jpg?v=1653493780"
							}
							style={{ objectFit: "cover", height: "100%", objectPosition: "center center" }}
						/>
						<img
							src={"https://m.media-amazon.com/images/I/61omIL8-wlL.jpg"}
							style={{ objectFit: "cover", height: "100%", objectPosition: "center center" }}
						/>
						<img
							src={"https://www.chessbazaar.com/blog/wp-content/uploads/2016/11/feature-image-scaled.jpg"}
							style={{ objectFit: "cover", height: "100%", objectPosition: "center center" }}
						/>
					</Carousel>
					<h2>Juego de Ajedrez</h2>
				</div>
				<div className="button-group" style={{ justifyContent: "space-evenly" }}>
					<AddToWishlistButton onClick={(e) => alert("Agregar producto")}/>
					<SkipProductButton onClick={(e) => alert("Saltear producto")}/>
				</div>
			</div>
		</div>
	);
}

export default Home;
