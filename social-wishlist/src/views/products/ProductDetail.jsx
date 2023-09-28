import { useState } from 'react'
import pic1 from './../../img/pic1.jpg'

function ProductDetail() {

	return (
		<>
	<header className="header transparent">
		<div className="main-bar">
			<div className="container">
				<div className="header-content">
					<div className="left-content">
						<a href="/SocialWishlist/List" className="back-btn icon-box-3 icon-sm">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M21.0001 9.99999H7.82806L11.4141 6.41399C11.7784 6.03679 11.98 5.53158 11.9754 5.00719C11.9709 4.48279 11.7605 3.98117 11.3897 3.61035C11.0189 3.23954 10.5173 3.0292 9.99286 3.02464C9.46847 3.02009 8.96327 3.22167 8.58606 3.58599L1.58606 10.586C1.21112 10.961 1.00049 11.4697 1.00049 12C1.00049 12.5303 1.21112 13.0389 1.58606 13.414L8.58606 20.414C8.77056 20.605 8.99124 20.7574 9.23525 20.8622C9.47926 20.967 9.7417 21.0222 10.0073 21.0245C10.2728 21.0268 10.5362 20.9762 10.782 20.8756C11.0278 20.7751 11.2511 20.6266 11.4389 20.4388C11.6266 20.251 11.7751 20.0277 11.8757 19.7819C11.9763 19.5361 12.0269 19.2727 12.0246 19.0072C12.0223 18.7416 11.9671 18.4792 11.8623 18.2352C11.7574 17.9912 11.6051 17.7705 11.4141 17.586L7.82806 14H21.0001C21.5305 14 22.0392 13.7893 22.4143 13.4142C22.7893 13.0391 23.0001 12.5304 23.0001 12C23.0001 11.4696 22.7893 10.9609 22.4143 10.5858C22.0392 10.2107 21.5305 9.99999 21.0001 9.99999Z" fill="#303733"></path>
							</svg>
						</a>
					</div>
					<div className="mid-content">
					</div>
					<div className="right-content d-flex align-items-center">
						<a href="javascript:void(0);" className="item-bookmark icon-box-3 icon-sm">
							<svg id="Capa_1" height="20" viewBox="0 0 506.525 506.525" width="20" xmlns="http://www.w3.org/2000/svg"><g id="XMLID_1382_"><g id="XMLID_41_"><path id="XMLID_48_" d="m464.143 67.14c-56.52-56.51-146.47-58.51-202.99-2l-7.46 7.46s-6.92-6.92-7.22-7.21c-27.27-26.81-63.3-41.56-101.6-41.56-38.71 0-75.11 15.08-102.49 42.45-56.51 56.52-56.51 148.47 0 204.99l211.31 211.51 210.45-210.65c56.51-56.52 56.51-148.48 0-204.99zm-49.217 96.024c0-24.734-20.123-44.857-44.857-44.857v-30c41.276 0 74.857 33.581 74.857 74.857z"/></g></g></svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</header>

		    <div className="page-content">
        <div className="container bottom-content">
			<div className="product-view">
				<div className="overlay-black-light">
					<img src={pic1} alt="producto"  width="30%" height="350"/>
				</div>
				<div className="account-box style-2">
					<div className="container">
						<div className="company-detail">
							<div className="detail-content">
								<div className="flex-1">
									<h4 style={{color: "white"}}>Titulo del Producto</h4>
									<p style={{color: "white"}}>Detalle del producto. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
							</div>
				
						</div>

					</div>
				</div>
			</div>
		</div>


    </div>  

		</>
	)
}

export default ProductDetail
