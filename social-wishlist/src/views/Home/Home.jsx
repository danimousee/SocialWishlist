import { useEffect, useState } from "react";
import "./Home.css";
import ProductsCarrousel from "../../components/ProductsCarrousel/ProductsCarrousel";
import { Container } from "../../components/Styles.css";

const Home = () => {
  const [tab, setTab] = useState("forYou");
  const isFriendsTab = tab === "friends";

  return (
    <Container>
      <div className="content-box">
        <div className="button-group">
          <button
            className={`btn ${
				isFriendsTab ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setTab("friends")}
          >
            Friends
          </button>
          <button
            className={`btn ${
				!isFriendsTab ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setTab("forYou")}
          >
            For You
          </button>
        </div>
        <ProductsCarrousel isFriendsTab={isFriendsTab} />
      </div>
    </Container>
  );
};

export default Home;
