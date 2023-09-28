import { useState } from 'react'
import logo from './../../img/logo.png'

function Login() {

	return (
		<>
			<div className="page-content">
				<div className="account-box">
					<div className="page-title">
						<h5 className="title">Login</h5>
					</div>
					<div className="container">
						<div className="section-head text-center">
							<img src={logo} alt="Social Wishlist" width="300" height="350" />
							<h2 style={{color: "white"}}>Ingresar</h2>
						
						</div>
						<div className="account-area">

							<div className="mb-3 input-group input-group-icon">
								<a href="/SocialWishlist/Register" className="btn btn-google-plus mb-3 w-100">Google +&nbsp;
									<span className="btn-icon-end">
										<i className="fa fa-google"></i>
									</span>
								</a>
							</div>

							<div className="mb-3 input-group input-group-icon">
								<a href="/SocialWishlist/Register" className="btn btn-facebook mb-3 w-100">Facebook&nbsp;
									<span className="btn-icon-end">
										<i className="fa fa-facebook"></i>
									</span>
								</a>
							</div>


						</div>

					</div>
				</div>
			</div>

		</>
	)
}

export default Login
