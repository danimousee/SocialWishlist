import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "./ProductDetail.css";
import { Carousel } from "react-responsive-carousel";
import { addProductToUser, getProduct, getProductOfUser, productExistsInUser, removeProductFromUser } from "../../firebase/queries/products";
import { db } from "../../firebase";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
import { getUser } from "../../firebase/queries/users";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { markProduct, unmarkProduct } from "../../firebase/queries/carts";
import { addToCart, removeFromCart } from "../../actions/user";

function ProductDetail() {
	let { id } = useParams();
	const [searchParams] = useSearchParams();
	const wisherId = searchParams.get("wisherId");

	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => state.user);

	const productMarkedInit = cart.find(p => p.id === id) ? true : false;

	const inWishlistInit = wisherId === user.uid;

	const [loading, setLoading] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [product, setProduct] = useState({});
	const [wisher, setWisher] = useState({});
	const [productMarked, setProductMarked] = useState(productMarkedInit);
	const [productMarkedByThird, setProductMarkedByThird] = useState(false);
	const [inWishlist, setInWishlist] = useState(inWishlistInit);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (inWishlistInit === false) {
			// Not from my profile. check
			checkInWishlist();
		}
		if (wisherId) {
			getProductOfUser(wisherId, id).then(product => {
				setProductMarkedByThird(checkProductMarkedByThird(product));
				setProduct(product);
				if (user.uid !== wisherId) {
					getUser(db, wisherId).then(user => {
						setWisher(user);
						setLoading(false);
					});
				} else {
					setLoading(false);
				}
			}).catch(error => {
				// Replace with snackbar
				alert("Error fetching product information", error.message);
				setLoading(false);
			});
		} else {
			getProduct(db, id).then(function (product) {
				setProduct(product);
				setLoading(false);
			}).catch(error => {
				// Replace with snackbar
				alert("Error fetching product information", error.message);
				setLoading(false);
			});
		}
	}, []);

	async function checkInWishlist() {
		const res = await productExistsInUser(user.uid, id);
		setInWishlist(res);
	}

	function checkProductMarkedByThird(product) {
		const marked = product.markerUid && product.markerUid !== user.uid;
		if (marked) {
			setMessage("Gift already marked by someone else 🥲");
		}
		return marked;
	}

	async function handleMarkProduct(e) {
		try {
			setButtonLoading(true);
			await markProduct(user.uid, wisher.uid, product);
			dispatch(addToCart({...product, wisherUid: wisher.uid}));
			setProductMarked(true);
			setMessage("Gift marked")
		} catch (error) {
			// Replace with snackbar
			setMessage("Error marking product");
		} finally {
			setButtonLoading(false);
		}
	}

	async function handleUnmarkProduct(e) {
		try {
			setButtonLoading(true);
			await unmarkProduct(user.uid, wisher.uid, product);
			dispatch(removeFromCart(product));
			setProductMarked(false);
			setMessage("Gift unmarked")
		} catch (error) {
			// Replace with snackbar
			setMessage("Error unmarking product");
		} finally {
			setButtonLoading(false);
		}
	}

	async function handleAddToWishlist(e) {
		try {
			setButtonLoading(true);
			await addProductToUser(db, product, user.uid);
			setMessage("Product added to wishlist");
			setInWishlist(true);
		} catch (error) {
			// Replace with snackbar
			setMessage("Error adding to wishlist");
		} finally {
			setButtonLoading(false);
		}
	}

	async function handleRemoveFromWishlist(e) {
		try {
			setButtonLoading(true);
			await removeProductFromUser(db, product, user.uid);
			setMessage("Product removed from wishlist");
			setInWishlist(false);
		} catch (error) {
			// Replace with snackbar
			setMessage("Error removing from wishlist");
		} finally {
			setButtonLoading(false);
		}
	}


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

						{ wisher.uid && 
							<div className="wisher-box">
								<div className="wisher-info">
									<p>In the wishlist of:</p>
									<Link to={`/profile/${wisher.uid}`}>
										<Avatar className="avatar" img={wisher.photoURL} />
										<b>{ wisher.displayName }</b>
									</Link>
								</div>
								{	productMarked ?
									<button className="btn btn-cancel" disabled={ buttonLoading || productMarkedByThird } onClick={ handleUnmarkProduct }>Unmark Gift</button>
									:
									<button className="btn btn-cta" disabled={ buttonLoading || productMarkedByThird } onClick={ handleMarkProduct }>Mark Gift</button> 
								}
							</div>
						}

						<p className="user-feedback" onChange={(e) => console.log("message changed")}>{ message }</p>
						
						{
							inWishlist ?
								<button className="btn btn-cancel" disabled={ buttonLoading } onClick={ handleRemoveFromWishlist }>Remove from Wishlist</button>
								:
								<button className="btn btn-primary" disabled={ buttonLoading } onClick={ handleAddToWishlist }>Add to Wishlist</button>
						}

					</div>
				</>
			)}
		</>
	);
}

export default ProductDetail;
