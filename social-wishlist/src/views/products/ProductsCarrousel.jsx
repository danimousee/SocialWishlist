import { useState } from "react";
import AddToWishlistButton from "../../components/AddToWishlistButton/AddToWishlistButton";
import SkipProductButton from "../../components/SkipProductButton/SkipProductButton";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { H2 } from "../../components/Styles.css";


const ProductsCarrousel = () => {
  const [page, setPage] = useState(0);
  const { products } = useSelector((state) => state.products);

  const nextPage = () => {
    if (page === products.length - 1) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  return (
    <>
      <div className="carousel-slider">
        <Carousel showThumbs={false} showStatus={false}>
          {products[page]?.images.map((img, i) => (
            <>
              <img
                key={i}
                src={img}
                style={{
                  objectFit: "cover",
                  height: "100%",
                  objectPosition: "center center",
                }}
              />
            </>
          ))}
        </Carousel>
        <H2>Juego de Ajedrez</H2>
      </div>
      <div className="button-group" style={{ justifyContent: "space-evenly" }}>
        <AddToWishlistButton onClick={nextPage} />
        <SkipProductButton onClick={nextPage} />
      </div>
    </>
  );
};

export default ProductsCarrousel;
