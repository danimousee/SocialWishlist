import { useState } from 'react'
import logo from './../../img/logo.png'

function Register() {

	return (
		<>
			<div class="page-content">
		<div class="account-box">
			<div class="page-title">
				<h5 class="title">Registro</h5>
			</div>
			<div class="container">
				<div class="section-head text-center">
					<img src={logo} alt="Social Wishlist" width="300" height="350" />
					<h2 style={{color: "white"}}>Datos Personales</h2>
				</div>
				<div class="account-area">
					<form>
						<div class="mb-3 input-group input-group-icon">
							<div class="input-group-text">
								<div class="input-icon">
								<i class="fa fa-user text-primary"></i>
								</div>
							</div>
							<input type="text" class="form-control" placeholder="Nombre de Usuario" />
						</div>
						<div class="mb-3 input-group input-group-icon">
							<div class="input-group-text">
								<div class="input-icon">
								<i class="fa fa-list text-primary"></i>
								</div>
							</div>
							<input type="text" class="form-control" placeholder="Nombre y Apellido" />
						</div>
						<div class="mb-3 input-group input-group-icon">
							<div class="input-group-text">
								<div class="input-icon">
								<i class="fa fa-calendar-days text-primary"></i>
								</div>
							</div>
							<input type="text" class="form-control" placeholder="Fecha de Nacimiento" />
						</div>
		
						<div class="input-group mb-3 input-group-icon">
							<textarea class="form-control" placeholder="Acerca de mi..." rows="4"></textarea>
						</div>
					</form>  
				</div>
				<div class="container">
					<a href="/SocialWishlist/Profile" class="btn mb-3 btn-primary w-100">Registrate</a>
				</div>
			</div>
        </div>
    </div>

		</>
	)
}

export default Register
