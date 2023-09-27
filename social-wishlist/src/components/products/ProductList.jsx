import { useState } from 'react'
import pic1 from './../../img/pic1.jpg'
import pic2 from './../../img/pic2.jpg'
import pic3 from './../../img/pic3.jpg'
import pic4 from './../../img/pic4.jpg'
import pic5 from './../../img/pic5.jpg'
import pic6 from './../../img/pic6.jpg'

function ProductList() {

	return (
		<>
		<header class="header style-2">
			<div class="main-bar">
				<div class="container">
					<div class="header-content">
						<div class="left-content">
							<a href="javascript:void(0);" class="back-btn">
								<i class="fa-solid fa-arrow-left"></i>
							</a>
							<h4 class="title font-w600 mb-0 text-nowrap ">Productos</h4>
						</div>
						<div class="mid-content">
						</div>
						<div class="right-content d-flex align-items-center">
							<a href="#" class="notify-cart2">
									<i class="fa fa-2x fa-shopping-cart text-primary"></i>
								<span class="badge badge-danger">3</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>

			<div class="page-content">
        <div class="container fb">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Búsqueda</h4>
                </div>
                <div class="card-body">
                    <div class="dz-lightgallery row g-2" id="lightgallery">
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic1} alt="image" />
                        </a>
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic2} alt="image" />
                        </a>
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic3} alt="image" />
                        </a>
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic4} alt="image" />
                        </a>
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic5} alt="image" />
                        </a>
                        <a class="col-6" href="/SocialWishlist/Detail">
                            <img src={pic6} alt="image" />
                        </a>
                    </div>
                </div>
            </div>
        </div>   
    </div>

		</>
	)
}

export default ProductList
