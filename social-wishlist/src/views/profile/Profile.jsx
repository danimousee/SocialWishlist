import { useState , useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '../../components/Avatar/Avatar';
import "./Profile.css"
import LogoutIcon from '@mui/icons-material/Logout';

import { googleSignOut } from "../../firebase/auth/googleAuth";
import { userLogOut } from "../../actions/user";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { getProductsOfUser } from '../../firebase/queries/products';
import ProductThumbnail from '../../components/ProductThumbnail/ProductThumbnail';



const Profile = () => {
	const dispatch = useDispatch();

	const location = useLocation();
	const currentLocation = location.pathname.slice(1).split("/").shift();

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

    useEffect(() => {
		if (user && user.uid) {
			setLoading(true); // Iniciar la carga antes de llamar a la API
	
			getProductsOfUser(user.uid)
				.then(products => {
					setUserProducts(products);
					setLoading(false); // Finalizar la carga después de obtener los productos
				})
				.catch(error => {
					console.error("Error fetching user products:", error);
					setLoading(false); // Asegurarse de finalizar la carga incluso si hay un error
				});
		}
	}, [user]);


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
			) 
		} else if (userProducts.length > 0) {
            return (
				<div className='product-thumbnail-grid'>
					{userProducts.map((product, i) => {
						return (
							<ProductThumbnail key={i} product={product} /> 
						)
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
			<div className='profile-main'>
				<div className='log-out-user'>
					<button className='log-out-button' onClick={handleSignOut}><LogoutIcon className='log-out-icon'/></button>
				</div>
				{/* Profile Card Section*/}
				<div className='p-card'>
						<div className='p-info'>
							<div className='friends-counter'>
								<h2>Friends</h2>
								<h2>0</h2>
							</div>
							<div className='prof-picture'>
								{<Avatar img={user.photoURL} />}
							</div>
							<div className='wishes-counter'>
								<h2>Wishes</h2>
								<h2>{ userProducts.length }</h2>
							</div>
						</div>

						<div className='p-options'>
							<div className='edit-option'>
								<button className='button-edit-profile'>Edit profile</button>
							</div>
							<div className='share-option'>
								<button className='button-share-profile'>Share profile</button>
							</div>
						</div>
				</div>
				
				{/* Photos Section */}
				<div className='p-photos'>
					<div className='tab-selector'>
						<div className={activeTab === "wishes" ? 'wishes active' : 'wishes'} onClick={selectWishesTab}>
							<h2>Wishes</h2>
						</div>
						<div className={activeTab === "cart" ? 'cart active' : 'cart'} onClick={selectCartTab}>
							<h2>Cart</h2>
						</div>
					</div>
					<div className='p-photos-show'>
						{activeTab === "wishes" ? renderUserProducts() : <h1>There nothing here yet</h1>}
					</div>
					
				</div>
			</div>
		</>
	)
}

export default Profile;
