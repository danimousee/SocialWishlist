import { useState } from 'react'
import logo from './../../img/logo.png'

function Login() {

	return (
		<>
			<div class="page-content">
				<div class="account-box">
					<div class="page-title">
						<h5 class="title">Login</h5>
					</div>
					<div class="container">
						<div class="section-head text-center">
							<img src={logo} alt="Social Wishlist" width="300" height="350" />
							<h2 style={{color: "white"}}>Ingresar</h2>
						
						</div>
						<div class="account-area">

							<div class="mb-3 input-group input-group-icon">
								<a href="javascript:void(0);" class="btn btn-google-plus mb-3 w-100">Google +&nbsp;
									<span class="btn-icon-end">
										<i class="fa fa-google"></i>
									</span>
								</a>
							</div>

							<div class="mb-3 input-group input-group-icon">
								<a href="javascript:void(0);" class="btn btn-facebook mb-3 w-100">Facebook&nbsp;
									<span class="btn-icon-end">
										<i class="fa fa-facebook"></i>
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
