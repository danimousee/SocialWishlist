import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./ProductThumbnail.css"

function ProductThumbnail({product, wisherId = ""}) {
    const styles = {
        aspectRatio: 1,
        display: "block",
        width: "100%",
        objectFit: "cover",
        borderRadius: "5px"
    }

  return (
    <Link className='product-thumbnail' to={`/product/${product.id}${wisherId ? '?wisherId=' + wisherId : "" }`}>
        {product.markerUid && <ShoppingCartIcon className='cart-icon'/>}
        <img src={product.images[0]} style={styles}
        />
    </Link>
  )
}

export default ProductThumbnail