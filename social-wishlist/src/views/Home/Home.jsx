import { useEffect, useState } from "react";
import SearchBar from "/src/components/SearchBar/SearchBar";
import "./Home.css";
import ProductsCarrousel from "../../components/ProductsCarrousel/ProductsCarrousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../firebase/queries/products";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "../../components/Styles.css";

const Home = () => {
  const [tab, setTab] = useState("forYou");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);


  return (
    <Container>
      <SearchBar search={(input) => dispatch(getAllProducts(input))} />

      <div className="content-box">
        <div className="button-group">
          <button
            className={`btn ${
              tab === "friends" ? "btn-primary" : "btn-secondary"
            }`}
            onClick={(e) => setTab("friends")}
          >
            Friends
          </button>
          <button
            className={`btn ${
              tab === "forYou" ? "btn-primary" : "btn-secondary"
            }`}
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
