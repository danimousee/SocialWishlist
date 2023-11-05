import SearchBar from "/src/components/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../firebase/queries/products";
import { useEffect, useState } from "react";
import "./Search.css";
import { getUsers } from "../../utils/users";
import UsersList from "../../components/users/UsersList";
import ProductList from "../ProductList/ProductList";

function Search() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("products");
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScroll(window.pageYOffset > 25)
      );
    }
  }, []);

  const search = (input) => {
    if (tab === "products") {
      dispatch(getAllProducts(input));
    } else {
      getUsers(input, dispatch);
    }
  };

  const renderTab = () => {
    if (tab === "products") {
      return <ProductList />;
    } else {
      return <UsersList />;
    }
  };

  return (
    <div className="main-box search-container">
      <SearchBar search={(input) => search(input)} />
      <div className={`search-tab ${scroll && "scroll"}`}>
        <div
          className={tab === "products" ? "products active" : "products"}
          onClick={() => setTab("products")}
        >
          <h2>Productos</h2>
        </div>
        <div
          className={tab === "users" ? "users active" : "users"}
          onClick={() => setTab("users")}
        >
          <h2>Usuarios</h2>
        </div>
      </div>
      <div className="content-box">{renderTab()}</div>
    </div>
  );
}

export default Search;
