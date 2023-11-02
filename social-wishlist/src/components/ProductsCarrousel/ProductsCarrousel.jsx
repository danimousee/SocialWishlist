import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../SkipProductButton/SkipProductButton";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2 } from "../Styles.css";
import "./ProductsCarrousel.css";
import { Box, CircularProgress } from "@mui/material";
import {
  addProductToUser,
  getAllProducts,
  getProductsOfUser,
} from "../../firebase/queries/products";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { incrementPage, resetPage } from "../../actions/products";
import { useEffect, useState } from "react";
import { bool } from "prop-types";
import { getFriends } from "../../firebase/queries/users";

const ProductsCarrousel = ({ isFriendsTab }) => {
  const { products, loading, page } = useSelector((state) => state.products);
  const { user, loggedIn } = useSelector((state) => state.user);
  const [productsSlider, setProductsSlider] = useState();
  const [loadingFriendsProds, setLoadingFriendsProds] = useState(true);
  const [friendsProducts, setFriendsProducts] = useState([]);
  const finalProducts = isFriendsTab ? friendsProducts : products;
  console.log(finalProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFriendsTab) {
      getFriends(user.uid).then((friends) => {
        setLoadingFriendsProds(true);
        friends?.forEach((friend) => {
          getProductsOfUser(friend.uid)
            .then((products) => {
              const mappedProducts = products.map((product) => ({
                ...product,
                photoURL: friend.photoURL,
              }));
              setFriendsProducts((friendsProducts) =>
                [...friendsProducts, ...mappedProducts].sort(function () {
                  return 0.5 - Math.random();
                })
              );

              setLoadingFriendsProds(false);
            })
            .catch((error) => {
              console.error("Error fetching friend products:", error);
            });
        });
      });
    } else {
      dispatch(getAllProducts());
    }
  }, [dispatch, isFriendsTab, user?.uid]);

  useEffect(() => {
    if (!loading && finalProducts.length > 0) {
      setProductsSlider([finalProducts[page], finalProducts[page + 1]]);
    }
  }, [page, loading, finalProducts]);

  const nextPage = () => {
    if (page === finalProducts.length - 1) {
      dispatch(resetPage());
    } else {
      dispatch(incrementPage());
    }
  };

  const compressString = (string = "", max) => {
    if (string.length > max) {
      return string.slice(0, max) + "...";
    }
    return string;
  };

  const handleAddToWishlist = async () => {
    if (loggedIn) {
      try {
        addProductToUser(db, finalProducts[page], user.uid);
      } catch (error) {
        // show error dialog? and prompt retry?
      }

      const hiddenSlide = document.getElementsByClassName("hidden-product");
      const currentSlide = document.getElementsByClassName("carousel-slider");
      currentSlide[0].style.transform = "translate(500px,500px)";
      hiddenSlide[0].style.transform = "translate(-700px,-700px)";

      setTimeout(() => {
        currentSlide[0].style.transform = "translate(0)";
        hiddenSlide[0].style.transform = "translate(-700px,-700px)";
        nextPage();
      }, 300);
    } else {
      // show dialog to user to login.
      navigate("/login");
    }
  };

  const handleSkipProduct = () => {
    if (loggedIn) {
      const hiddenSlide = document.getElementsByClassName("hidden-product");
      const currentSlide = document.getElementsByClassName("carousel-slider");
      currentSlide[0].style.transform = "translate(-500px,500px)";
      hiddenSlide[0].style.transform = "translate(-700px,-700px)";

      setTimeout(() => {
        currentSlide[0].style.transform = "translate(0)";
        hiddenSlide[0].style.transform = "translate(-700px,-700px)";
        nextPage();
      }, 300);
    } else {
      navigate("/login");
    }
  };

  const renderSlider = () => {
    if (productsSlider && productsSlider.length > 0) {
      return productsSlider.map((product, i) => {
        return (
          <Link
            className={`carousel-slider ${i === 1 && "hidden-product"}`}
            to={`/product/${finalProducts[page].id}`}
            key={i}
          >
            <Carousel showThumbs={false} showStatus={false}>
              {product.images.map((img, i) => (
                <>
                  {isFriendsTab && (
                    <div className="user_img_container">
                      <img
                        className="user_img"
                        key={i}
                        src={product.photoURL}
                      />
                    </div>
                  )}
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
                </>
              ))}
            </Carousel>
            <H2 className="product-name">{compressString(product.name, 80)}</H2>
          </Link>
        );
      });
    }
  };

  if (loading || (isFriendsTab && loadingFriendsProds)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      {finalProducts.length > 0 ? (
        <div>
          <div className="slider-container">{renderSlider()}</div>
          <div
            className="button-group"
            style={{ justifyContent: "space-evenly" }}
          >
            <SkipProductButton id="btn-right" onClick={handleSkipProduct} />
            <AddToWishlistButton id="btn-left" onClick={handleAddToWishlist} />
          </div>
        </div>
      ) : (
        <H2>No se encontraron productos para tu busqueda</H2>
      )}
    </>
  );
};

ProductsCarrousel.propTypes = {
  isFriendsTab: bool.isRequired,
};

export default ProductsCarrousel;
