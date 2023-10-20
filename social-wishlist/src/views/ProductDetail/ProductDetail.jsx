import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import { Carousel } from "react-responsive-carousel";
import { getProduct } from "../../firebase/queries/products";
import { db } from "../../firebase";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

function ProductDetail() {
	let { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState({});

	useEffect(() => {
		getProduct(db, id).then(function (product) {
			setProduct(product);
			setLoading(false);
		});
	}, []);

	return (
		<>
			{loading ? (
				<FullScreenLoader />
			) : (
				<>
					<div
						className="product-banner-box"
						style={{
							backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent 75%), url(${product.images[0]})`,
						}}
					>
						<h2 className="product-banner-title">{product.name}</h2>
					</div>
					<div className="main-box product-detail-main-box">
						{/* <div className="user-reaction-box">
					<img className="user-avatar" />
					<p>
						In the wishlist of: <b>User Name</b>
					</p>
					<p>"quote goes here."</p>
				</div> */}
						{product.description && <p className="product-description">{product.description}</p>}
						{product.category && (
							<p>
								Category: <b>{product.category}</b>
							</p>
						)}
						{product.provider && (
							<p>
								Provider: <b>{product.provider}</b>{" "}
							</p>
						)}
						<Carousel showThumbs={false} showStatus={false}>
							{product.images.map((img, i) => (
								<img
									key={i}
									src={img}
									style={{
										objectFit: "cover",
										height: "100%",
										objectPosition: "center center",
										borderRadius: "14px",
									}}
								/>
							))}
						</Carousel>
						<p>
							<a target="_blank" href={product.url}>
								See in Store
							</a>
						</p>
					</div>
				</>
			)}
		</>
	);
}

export default ProductDetail;
