import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import "./Profile.css";
import LogoutIcon from "@mui/icons-material/Logout";

import { googleSignOut } from "../../firebase/auth/googleAuth";
import { userLogOut } from "../../actions/user";
import { useNavigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getProductsOfUser } from "../../firebase/queries/products";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import { getUser } from "../../firebase/queries/users";
import { db } from "../../firebase";

const Profile = () => {
	let { user_id } = useParams();

	const dispatch = useDispatch();
	const { user, loggedIn } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const handleSignOut = function () {
		googleSignOut().then((res) => {
			dispatch(userLogOut());
			navigate("/login");
		});
	};

	//----------------------------

	const [userProducts, setUserProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [itsMyProfile, setItsMyProfile] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		setItsMyProfile(false); // Reset value on route change
		setLoading(true); // Iniciar la carga antes de llamar a la API

		const loadUserProducts = (user) => {
			getProductsOfUser(user.uid)
				.then((products) => {
					setUserProducts(products);
					setLoading(false); // Finalizar la carga después de obtener los productos
				})
				.catch((error) => {
					console.error("Error fetching user products:", error);
					setLoading(false); // Asegurarse de finalizar la carga incluso si hay un error
				});
		};

		// Determine if you're the owner of the profile
		if (user.uid === user_id) {
			setItsMyProfile(true);
			setUserInfo(user);
			loadUserProducts(user);
		} else {
			getUser(db, user_id).then((user) => {
				setUserInfo(user);
				loadUserProducts(user);
			});
		}
	}, [user, user_id]);

	const renderUserProducts = () => {
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
		} else if (userProducts.length > 0) {
			return (
				<div className="product-thumbnail-grid">
					{userProducts.map((product, i) => {
						return <ProductThumbnail key={i} product={product} />;
					})}
				</div>
			);
		} else {
			return <h2>Empty Wishlist</h2>;
		}
	};

	//------

	const [activeTab, setActiveTab] = useState("wishes");
	const selectWishesTab = () => setActiveTab("wishes");
	const selectCartTab = () => setActiveTab("cart");

	return (
		<>
			<div className="profile-main">
				<div className="log-out-user">
					<button className="log-out-button" onClick={handleSignOut}>
						<LogoutIcon className="log-out-icon" />
					</button>
				</div>
				{/* Profile Card Section*/}
				<div className="p-card">
					<div className="p-info">
						<div className="friends-counter">
							<h2>Friends</h2>
							<h2>0</h2>
						</div>
						<div className="prof-picture">{<Avatar img={userInfo.photoURL} />}</div>
						<div className="wishes-counter">
							<h2>Wishes</h2>
							<h2>{userProducts.length}</h2>
						</div>
					</div>
					<div className="p-name">
						<h3>{userInfo.displayName}</h3>
					</div>

					{itsMyProfile && (
						<div className="p-options">
							<div className="edit-option">
								<button className="button-edit-profile">Edit profile</button>
							</div>
							<div className="share-option">
								<button className="button-share-profile">Share profile</button>
							</div>
						</div>
					)}
				</div>

				{/* Photos Section */}
				<div className="p-photos">
					<div className="tab-selector">
						<div className={activeTab === "wishes" ? "wishes active" : "wishes"} onClick={selectWishesTab}>
							<h2>Wishes</h2>
						</div>
						<div className={activeTab === "cart" ? "cart active" : "cart"} onClick={selectCartTab}>
							<h2>Cart</h2>
						</div>
					</div>
					<div className="p-photos-show">
						{activeTab === "wishes" ? renderUserProducts() : <h1>There nothing here yet</h1>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
