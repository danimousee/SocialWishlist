import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import "./Profile.css";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";

import { googleSignOut } from "../../firebase/auth/googleAuth";
import { userLogOut } from "../../actions/user";
import { useNavigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getProductsOfUser } from "../../firebase/queries/products";
import ProductThumbnail from "../../components/ProductThumbnail/ProductThumbnail";
import * as userQueries from "../../firebase/queries/users";
import { db } from "../../firebase";
import IconButton from "../../components/IconButton/IconButton";
import Friends from "../Friends/Friends";
import SidePanel from "../../components/SidePanel/SidePanel";

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
	const [activeTab, setActiveTab] = useState("wishes");
	// VALUES: "NOT_FRIENDS", "PENDING", "FRIENDS"
	const [isFriend, setIsFriend] = useState("");
	const [showFriends, setShowFriends] = useState(false);

	useEffect(() => {
		// Reset default state values on route change
		setItsMyProfile(false);
		setIsFriend("");
		setShowFriends(false);
		setUserInfo({});

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
			// This profile is from someone else
			userQueries.getUser(db, user_id).then((person) => {
				// Determine if it's my friend
				if (person.friends && person.friends[user.uid]) {
					setIsFriend("FRIENDS");
				} else if (person.friendRequests && person.friendRequests[user.uid]) {
					setIsFriend("PENDING");
				} else {
					setIsFriend("NOT_FRIENDS");
				}
				setUserInfo(person);
				loadUserProducts(person);
			});
		}
	}, [user, user_id]);

	const handleAddFriend = async (e) => {
		try {
			setIsFriend("PENDING");
			await userQueries.sendFriendRequest(user.uid, user_id);
		} catch (error) {
			setIsFriend("NOT_FRIENDS");
			// Use error snackbar to show error here
			console.error("Error adding friend. Try again later.");
		}
	}

	const handleCancelRequest = async (e) => {
		try {
			setIsFriend("NOT_FRIENDS");
			await userQueries.removeFriendRequest(user.uid, user_id);
		} catch (error) {
			setIsFriend("PENDING");
			// Use error snackbar to show error here
			console.error("Error removing friend request. Try again later");
		}
	}

	const handleRemoveFriend = async (e) => {
		try {
			setIsFriend("NOT_FRIENDS");
			await userQueries.removeFriend(user.uid, user_id);
		} catch (error) {
			setIsFriend("FRIENDS");
			// Use error snackbar to show error here
			console.error("Error removing friend. Try again later");
		}
	}

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
					<CircularProgress color="primary" />
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

	const selectWishesTab = () => setActiveTab("wishes");
	const selectCartTab = () => setActiveTab("cart");
	const handleFriendsClick = (e) => {
		if (itsMyProfile) {
			setShowFriends(true);
		}
	}

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
						<div className="friends-counter" onClick={handleFriendsClick}>
							<h2>Friends</h2>
							<h2>{userInfo.friends ? Object.values(userInfo.friends).length : 0}</h2>
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

					{itsMyProfile ? (
						/* OCULTADO HASTA DESARROLLAR FUNCIONALIDAD */
						<div className="p-options" style={{display:'none'}}>
							<IconButton onClick={(e) => console.log("You clicked an icon")}>
								<EditIcon />
							</IconButton>
							<IconButton onClick={(e) => console.log("You clicked an icon")}>
								<ShareIcon />
							</IconButton>
						</div>
					) : (
						<>
							{isFriend === "NOT_FRIENDS" && (
								<IconButton onClick={handleAddFriend}>
									<AddIcon />
								</IconButton>
							)}
							{isFriend === "PENDING" && (
								<IconButton onClick={handleCancelRequest}>
									<AccessTimeIcon />
								</IconButton>
							)}
							{isFriend === "FRIENDS" && (
								<IconButton onClick={handleRemoveFriend}>
									<DoneIcon />
								</IconButton>
							)}
						</>
					)}
				</div>

				{/* Photos Section */}
				<div className="p-photos">
					<div className="tab-selector">
						<div className={activeTab === "wishes" ? "wishes active" : "wishes"} onClick={selectWishesTab}>
							<h2>Wishes</h2>
						</div>

						{itsMyProfile && <div className={activeTab === "cart" ? "cart active" : "cart"} onClick={selectCartTab}>
							<h2>Cart</h2>
						</div>}
					</div>
					<div className="p-photos-show">
						{activeTab === "wishes" ? renderUserProducts() : <h1>There nothing here yet</h1>}
					</div>
				</div>
			</div>
			<SidePanel active={showFriends} handleActive={setShowFriends}>
				<Friends user={userInfo} />
			</SidePanel>
			
		</>
	);
};

export default Profile;
