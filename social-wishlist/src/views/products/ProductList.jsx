import { useState } from 'react'
import { Link } from "react-router-dom"
import pic1 from './../../img/pic1.jpg'
import pic2 from './../../img/pic2.jpg'
import pic3 from './../../img/pic3.jpg'
import pic4 from './../../img/pic4.jpg'
import pic5 from './../../img/pic5.jpg'
import pic6 from './../../img/pic6.jpg'

function ProductList() {

	return (
		<>
		<header className="header style-2">
			<div className="main-bar">
				<div className="container">
					<div className="header-content">
						<div className="left-content">
							<Link className="back-btn">
								<i className="fa-solid fa-arrow-left"></i>
							</Link>
							<h4 className="title font-w600 mb-0 text-nowrap ">Productos</h4>
						</div>
						<div className="mid-content">
						</div>
						<div className="right-content d-flex align-items-center">
							<Link className="notify-cart2">
                                <i className="fa fa-2x fa-shopping-cart text-primary"></i>
								<span className="badge badge-danger">3</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</header>

			<div className="page-content">
        <div className="container fb">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">Búsqueda</h4>
                </div>
                <div className="card-body">
                    <div className="dz-lightgallery row g-2" id="lightgallery">
                        <Link className="col-6" to="/detail">
                            <img src={pic1} alt="image" />
                        </Link>
                        <Link className="col-6" to="detail">
                            <img src={pic2} alt="image" />
                        </Link>
                        <Link className="col-6" to="detail">
                            <img src={pic3} alt="image" />
                        </Link>
                        <Link className="col-6" to="detail">
                            <img src={pic4} alt="image" />
                        </Link>
                        <Link className="col-6" to="detail">
                            <img src={pic5} alt="image" />
                        </Link>
                        <Link className="col-6" to="detail">
                            <img src={pic6} alt="image" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>   
    </div>

		</>
	)
}

export default ProductList
