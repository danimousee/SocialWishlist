import { useState } from 'react'
import avatar from './../../img/avatar.jpg'

function Profile() {

	return (
		<>
	<header className="header style-2">
			<div className="main-bar">
				<div className="container">
					<div className="header-content">
						<div className="left-content">
							<a href="javascript:void(0);" className="back-btn">
								<i className="fa-solid fa-arrow-left"></i>
							</a>
							<h4 className="title font-w600 mb-0 text-nowrap ">Perfil</h4>
						</div>
						<div className="mid-content">
						</div>
						<div className="right-content d-flex align-items-center">
							<a href="#" className="notify-cart2">
									<i className="fa fa-2x fa-shopping-cart text-primary"></i>
								<span className="badge badge-danger">3</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>


			 <div className="page-content">
        <div className="container fb">
			<div className="profile-area">
				<div className="main-profile">
					<div className="profile-image">
						<img src={avatar} alt="profile-image" />
					</div>
					<div className="profile-detail">
						<h4 className="name" style={{color: "white"}}>Roberto Fernandez</h4>
						<p className="location">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#F97979"><path d="M507.49 101.721L352.211 256 507.49 410.279c2.807-5.867 4.51-12.353 4.51-19.279V121c0-6.927-1.703-13.412-4.51-19.279zM467 76H45c-6.927 0-13.412 1.703-19.279 4.51l198.463 197.463c17.548 17.548 46.084 17.548 63.632 0L486.279 80.51C480.412 77.703 473.927 76 467 76zM4.51 101.721C1.703 107.588 0 114.073 0 121v270c0 6.927 1.703 13.413 4.51 19.279L159.789 256 4.51 101.721zM331 277.211l-21.973 21.973c-29.239 29.239-76.816 29.239-106.055 0L181 277.211 25.721 431.49C31.588 434.297 38.073 436 45 436h422c6.927 0 13.412-1.703 19.279-4.51L331 277.211z"/></svg>
							<span>rfernandez@gmail.com</span>
						</p>
						<div className="contact">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12.1646 10.5843C11.6418 10.0683 10.9893 10.0683 10.4699 10.5843C10.0737 10.9772 9.67747 11.3701 9.28793 11.7696C9.18139 11.8795 9.09149 11.9028 8.96164 11.8295C8.70527 11.6897 8.43226 11.5765 8.18588 11.4233C7.03722 10.7008 6.07501 9.77193 5.22267 8.72649C4.79983 8.20709 4.4236 7.65107 4.16058 7.02514C4.10731 6.89862 4.11729 6.81538 4.22051 6.71217C4.61671 6.32928 5.00293 5.93641 5.39247 5.54353C5.93517 4.9975 5.93517 4.35825 5.38914 3.80889C5.07951 3.49592 4.76987 3.18961 4.46023 2.87664C4.1406 2.55702 3.8243 2.23406 3.50135 1.91776C2.97862 1.40836 2.32605 1.40836 1.80666 1.92109C1.40712 2.31397 1.02424 2.71683 0.618043 3.10305C0.241816 3.4593 0.0520369 3.89546 0.0120835 4.40486C-0.051176 5.23389 0.15192 6.01631 0.438253 6.77876C1.02424 8.35692 1.91653 9.75862 2.9986 11.0438C4.46023 12.7818 6.20486 14.1568 8.24581 15.149C9.16474 15.5951 10.117 15.9381 11.1524 15.9947C11.8649 16.0346 12.4842 15.8548 12.9803 15.2988C13.3199 14.9193 13.7028 14.573 14.0624 14.2101C14.5951 13.6707 14.5984 13.0181 14.069 12.4854C13.4364 11.8495 12.8005 11.2169 12.1646 10.5843Z" fill="#F97979"/>
								<path d="M11.5286 7.93075L12.7571 7.72099C12.564 6.59231 12.0313 5.57017 11.2222 4.75778C10.3666 3.90211 9.28451 3.36274 8.09256 3.19627L7.91943 4.4315C8.84169 4.56134 9.68071 4.97753 10.3433 5.64009C10.9692 6.26602 11.3787 7.05843 11.5286 7.93075Z" fill="#F97979"/>
								<path d="M13.4496 2.59031C12.0312 1.17197 10.2367 0.276344 8.25565 0L8.08252 1.23523C9.79386 1.47495 11.3454 2.25071 12.5706 3.47262C13.7326 4.63459 14.495 6.10288 14.7714 7.71766L15.9999 7.50791C15.677 5.63676 14.7947 3.93874 13.4496 2.59031Z" fill="#F97979"/>								<defs>
								<clipPath id="clip0_839_173">
								<rect width="16" height="16" fill="white"/>
								</clipPath>
								</defs>
							</svg>
							<span>+5411-6456-3215</span>
						</div>
					</div>
					{/* <a href="edit-profile.html" className="edit-profile">
						<i className="fa-regular fa-pen-to-square"></i>
					</a> */}
				</div>
				<div className="content-box">
					<ul className="row">
						<li className="col-6">							
							<a href="#">
								<div className="icon-box-5 mb-2">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.7623 0.561914C15.5618 0.215313 15.1886 0 14.7885 0H10.6064V4.94676H18.2984L15.7623 0.561914Z" fill="white"/>
										<path d="M9.43424 0H5.21275C4.81182 0 4.43865 0.215703 4.23818 0.563086L1.71143 4.94676H9.4342V0H9.43424Z" fill="white"/>
										<path d="M1.2915 6.11906V18.6218C1.2915 19.3818 1.9101 20 2.67014 20H17.3303C18.0903 20 18.7089 19.3818 18.7089 18.6218V6.11906H1.2915ZM12.661 11.3769L9.62936 14.4085C9.51486 14.523 9.36479 14.5804 9.21475 14.5804C9.06471 14.5804 8.91463 14.523 8.80053 14.4085L7.37932 12.9876C7.15072 12.759 7.15072 12.3878 7.37932 12.1588C7.6083 11.9298 7.97955 11.9298 8.20853 12.1588L9.21479 13.1654L11.8322 10.548C12.0612 10.3191 12.4324 10.3191 12.661 10.548C12.89 10.777 12.89 11.1479 12.661 11.3769Z" fill="white"/>
									</svg>
								</div>
								<span>Mis Amigos</span>
							</a>
						</li>
						<li className="col-6">							
							<a href="#">
								<div className="icon-box-5 mb-2">
									<svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M9.50001 16C6.29858 14.1386 0.0824129 9.63442 0.001069 5.14019C-0.0878081 0.233543 5.38379 -1.99173 9.50001 2.22702C13.6156 -1.99113 19.087 0.232683 18.999 5.13933C18.9184 9.63386 12.7016 14.1385 9.50001 16Z" fill="white"/>
									</svg>
								</div>
								<span>Mis Intereses</span>
							</a>
						</li>

					</ul>
				</div>
			 
			</div>
		</div>	
    </div>    

		</>
	)
}

export default Profile
