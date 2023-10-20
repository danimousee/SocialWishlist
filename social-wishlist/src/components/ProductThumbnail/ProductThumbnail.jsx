import React from 'react'
import { Link } from 'react-router-dom'

function ProductThumbnail({product}) {
    const styles = {
        aspectRatio: 1,
        display: "block",
        width: "100%",
        objectFit: "cover",
        borderRadius: "5px"
    }

  return (
    <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} style={styles}
        />
    </Link>
  )
}

export default ProductThumbnail