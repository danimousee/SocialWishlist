import { useEffect, useState } from "react";
import SearchBar from "/src/components/SearchBar/SearchBar";
import "./Home.css";
import ProductsCarrousel from "../../components/ProductsCarrousel/ProductsCarrousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../firebase/queries/products";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "../../components/Styles.css";
import { googleSignOut } from "../../firebase/auth/googleAuth";
import { userLogOut } from "../../actions/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [tab, setTab] = useState("forYou");
  const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	const navigate = useNavigate();
	const handleSignOut = function () {
		googleSignOut().then((res) => {
			dispatch(userLogOut());
			navigate("/login");
		});
	};

	return (
		<Container>

      {/* Mostrar solo si el usuario esta logeado leyendo el estado de loggedIn del store. Ver ejemplo en Nav.jsx */}
			<button className="signOut-btn" onClick={handleSignOut}>Sign Out</button>

			<SearchBar search={(input) => dispatch(getAllProducts(input))} />

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

				<ProductsCarrousel />
			</div>
		</Container>
	);
};

export default Home;
