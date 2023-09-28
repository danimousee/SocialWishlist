import { useState } from 'react'
import logo from './../../img/logo.png'

function Register() {

	return (
		<>
			<div className="page-content">
		<div className="account-box">
			<div className="page-title">
				<h5 className="title">Registro</h5>
			</div>
			<div className="container">
				<div className="section-head text-center">
					<img src={logo} alt="Social Wishlist" width="300" height="350" />
					<h2 style={{color: "white"}}>Datos Personales</h2>
				</div>
				<div className="account-area">
					<form>
						<div className="mb-3 input-group input-group-icon">
							<div className="input-group-text">
								<div className="input-icon">
								<i className="fa fa-user text-primary"></i>
								</div>
							</div>
							<input type="text" className="form-control" placeholder="Nombre de Usuario" />
						</div>
						<div className="mb-3 input-group input-group-icon">
							<div className="input-group-text">
								<div className="input-icon">
								<i className="fa fa-list text-primary"></i>
								</div>
							</div>
							<input type="text" className="form-control" placeholder="Nombre y Apellido" />
						</div>
						<div className="mb-3 input-group input-group-icon">
							<div className="input-group-text">
								<div className="input-icon">
								<i className="fa fa-calendar-days text-primary"></i>
								</div>
							</div>
							<input type="text" className="form-control" placeholder="Fecha de Nacimiento" />
						</div>
		
						<div className="input-group mb-3 input-group-icon">
							<textarea className="form-control" placeholder="Acerca de mi..." rows="4"></textarea>
						</div>
					</form>  
				</div>
				<div className="container">
					<a href="/SocialWishlist/Profile" className="btn mb-3 btn-primary w-100">Registrate</a>
				</div>
			</div>
        </div>
    </div>

		</>
	)
}

export default Register
