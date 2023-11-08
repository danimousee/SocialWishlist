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
import { userLogOut, userRefresh } from "../../actions/user";
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
	const { user, loggedIn, cart } = useSelector((state) => state.user);

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
	const [friendCount, setFriendCount] = useState(0);
	const [friendRequestCount, setFriendRequestCount] = useState(0);
	const [waitingAction, setWaitingAction] = useState(false);

	useEffect(() => {
		// Reset default state values on route change
		setItsMyProfile(false);
		setIsFriend("");
		setShowFriends(false);
		setUserInfo({});
		setFriendCount(0);
		setFriendRequestCount(0);
		setWaitingAction(false);
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
			if (user.friends) {
				setFriendCount(Object.values(user.friends).length);
			}
			if (user.friendRequests) {
				setFriendRequestCount(Object.values(user.friendRequests).length);
			}
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
				if (person.friends) {
					setFriendCount(Object.keys(person.friends).length);
				}
				loadUserProducts(person);
			});
		}
	}, [user, user_id]);

	const handleAddFriend = async (e) => {
		try {
			setWaitingAction(true);
			setIsFriend("PENDING");
			await userQueries.sendFriendRequest(user.uid, user_id);
		} catch (error) {
			setIsFriend("NOT_FRIENDS");
			// Use error snackbar to show error here
			console.error("Error adding friend. Try again later.");
		} finally {
			setWaitingAction(false);
		}
	};

	const handleCancelRequest = async (e) => {
		try {
			setWaitingAction(true);
			setIsFriend("NOT_FRIENDS");
			await userQueries.removeFriendRequest(user.uid, user_id);
		} catch (error) {
			setIsFriend("PENDING");
			// Use error snackbar to show error here
			console.error("Error removing friend request. Try again later");
		} finally {
			setWaitingAction(false);
		}
	};

	const handleRemoveFriend = async (e) => {
		try {
			setWaitingAction(true);
			setIsFriend("NOT_FRIENDS");
			await userQueries.removeFriend(user.uid, user_id);
		} catch (error) {
			setIsFriend("FRIENDS");
			// Use error snackbar to show error here
			console.error("Error removing friend. Try again later");
		} finally {
			setWaitingAction(false);
		}
	};

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
						return <ProductThumbnail wisherId={userInfo.uid} key={i} product={product} />;
					})}
				</div>
			);
		} else {
			return <h2>Empty Wishlist</h2>;
		}
	};

	const renderUserCart = () => {
		// Manejo con redux
		if (cart.length > 0) {
			return (
				<div className="product-thumbnail-grid">
					{cart.map((product, i) => {
						return <ProductThumbnail wisherId={product.wisherUid} key={i} product={product} />;
					})}
				</div>
			);
		} else {
			return <h2>Cart is empty</h2>;
		}
	}

	const handleCloseFriendsPanel = async (e) => {
		// Only if we are in our profile
		if (user.uid === user_id) {
			const newUser = await userQueries.getUser(db, user.uid)
			dispatch(userRefresh(newUser));
		}
		setShowFriends(false);
	}

	//------

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
						<div className="friends-counter" onClick={(e) => setShowFriends(true)}>
							<h2>Friends</h2>
							<h2>{friendCount}</h2>
							{itsMyProfile && friendRequestCount > 0 && <div className="notification-badge">{friendRequestCount}</div>}
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
						<div className="p-options" style={{ display: "none" }}>
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
								<IconButton onClick={handleAddFriend} disabled={waitingAction}>
									<AddIcon />
								</IconButton>
							)}
							{isFriend === "PENDING" && (
								<IconButton onClick={handleCancelRequest} disabled={waitingAction}>
									<AccessTimeIcon />
								</IconButton>
							)}
							{isFriend === "FRIENDS" && (
								<IconButton onClick={handleRemoveFriend} disabled={waitingAction}>
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

						{itsMyProfile && (
							<div className={activeTab === "cart" ? "cart active" : "cart"} onClick={selectCartTab}>
								<h2>Cart</h2>
							</div>
						)}
					</div>
					<div className="p-photos-show">
						{activeTab === "wishes" && renderUserProducts() }
						{activeTab === "cart" && renderUserCart()}
					</div>
				</div>
			</div> 
			<SidePanel active={showFriends} handleClose={handleCloseFriendsPanel}>
				<Friends
					user={userInfo}
					showRequests={user.uid === user_id}
				/>
			</SidePanel>
		</>
	);
};

export default Profile;
