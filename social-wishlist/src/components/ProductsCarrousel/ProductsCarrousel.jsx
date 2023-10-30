import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../SkipProductButton/SkipProductButton";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2 } from "../Styles.css";
import "./ProductsCarrousel.css";
import { Box, CircularProgress } from "@mui/material";
import { addProductToUser } from "../../firebase/queries/products";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { incrementPage, resetPage } from "../../actions/products";
import { useEffect, useState } from "react";

const ProductsCarrousel = () => {
  const { products, loading, page } = useSelector((state) => state.products);
  const { user, loggedIn } = useSelector((state) => state.user);
  const [productsSlider, setProductsSlider] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && products.length > 0) {
      setProductsSlider([products[page], products[page + 1]]);
    }
  }, [page, loading, products]);

  const nextPage = () => {
    if (page === products.length - 1) {
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
        addProductToUser(db, products[page], user.uid);
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
    if(productsSlider && productsSlider.length > 0) {

      return  productsSlider.map((product, i) => {
        return (
        <Link
          className={`carousel-slider ${i === 1 && "hidden-product"}`}
          to={`/product/${products[page].id}`}
          key={i}
        >
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
          <H2 className="product-name">{compressString(product.name, 80)}</H2>
        </Link>
      );
    });
  }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div>
          <div className="slider-container">
          {renderSlider()}
          </div>
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

export default ProductsCarrousel;
