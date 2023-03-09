import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { RoleTypeEnum } from './shared/enums/role-type.enum';

@Component({
	selector: 'app-topbar',
	template: `
        <div class="layout-topbar" style="width: 100%;left: 0px;">
			<div class="layout-topbar-wrapper">
                <div class="layout-topbar-left">
					<div class="layout-topbar-logo-wrapper d-lg-none">
						<a href="#" class="layout-topbar-logo">
						<img style="width:50px"  src="assets/img/saglik-bakanligi-logo.png"  alt="">
					<div class="ml-3">
					<h4 style="margin-bottom:0;font-weight:bold;color:white;">T.C. SAĞLIK BAKANLIĞI</h4>
					<strong class="d-none d-sm-block"style="font-size:12px;color:white;">SAĞLIK BİLGİ SİSTEMLERİ GENEL MÜDÜRLÜĞÜ</strong>
					</div>
						</a>
					</div>
				<div class="d-none d-lg-flex">
					<img  src="assets/img/saglik-bakanligi-logo.png" style="width:50px" alt="">
					<div class="ml-3">
					<h4 style="margin-bottom:0;font-weight:bold">T.C. SAĞLIK BAKANLIĞI</h4>
					<strong style="font-size:12px">SAĞLIK BİLGİ SİSTEMLERİ GENEL MÜDÜRLÜĞÜ</strong>
					</div>
					</div>
					<a href="#" class="sidebar-menu-button" (click)="appMain.onMenuButtonClick($event)">
						<i class="pi pi-bars"></i>
					</a>
					<a href="#" class="topbar-menu-mobile-button" (click)="appMain.onTopbarMobileMenuButtonClick($event)">
						<i class="pi pi-ellipsis-v"></i>
					</a>
					<!-- <div class="layout-megamenu-wrapper">
						<a class="layout-megamenu-button" href="#" (click)="appMain.onMegaMenuButtonClick($event)">
							<i class="pi pi-comment"></i>
							Mega Menu
						</a>
						<ul class="layout-megamenu" [ngClass]="{'layout-megamenu-active fadeInDown': appMain.megaMenuActive}"
                            (click)="appMain.onMegaMenuClick($event)">
							<li [ngClass]="{'active-topmenuitem': activeItem === 1}" (click)="mobileMegaMenuItemClick(1)">
								<a href="#">JavaServer Faces <i class="pi pi-angle-down"></i></a>
								<ul>
									<li class="active-row ">
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>PrimeFaces</h5>
                                        <span>UI Components for JSF</span>
                                    </span>
									</li>
									<li>
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>Premium Templates</h5>
                                        <span>UI Components for JSF</span>
                                    </span>
									</li>
									<li>
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>Extensions</h5>
                                        <span>UI Components for JSF</span>
                                    </span>
									</li>
								</ul>
							</li>
							<li [ngClass]="{'active-topmenuitem': activeItem === 2}" (click)="mobileMegaMenuItemClick(2)">
								<a href="#">Angular <i class="pi pi-angle-down"></i></a>
								<ul>
									<li>
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>PrimeNG</h5>
                                        <span>UI Components for Angular</span>
                                    </span>

									</li>
									<li>
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>Premium Templates</h5>
                                        <span>UI Components for Angular</span>
                                    </span>
									</li>
								</ul>
							</li>
							<li [ngClass]="{'active-topmenuitem': activeItem === 3}" (click)="mobileMegaMenuItemClick(3)">
								<a href="#">React <i class="pi pi-angle-down"></i></a>
								<ul>
									<li>
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>PrimeReact</h5>
                                        <span>UI Components for React</span>
                                    </span>
									</li>
									<li class="active-row">
										<i class="pi pi-circle-on"></i>
										<span>
                                        <h5>Premium Templates</h5>
                                        <span>UI Components for React</span>
                                    </span>
									</li>
								</ul>
							</li>
						</ul>
					</div> -->
                </div>
                <div class="layout-topbar-right fadeInDown">
					<ul class="layout-topbar-actions">
						<!-- <li #search class="search-item topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === search}">
							<a href="#" class="topbar-search-mobile-button" (click)="appMain.onTopbarItemClick($event,search)">
								<i class="topbar-icon pi pi-search"></i>
							</a>
							<ul class="search-item-submenu fadeInDown" (click)="appMain.topbarItemClick = true">
								<li>
                                    <span class="md-inputfield search-input-wrapper">
                                        <input pInputText placeholder="Search..."/>
                                        <i class="pi pi-search"></i>
                                    </span>
                                </li>
                            </ul>
                        </li> -->
						<!-- <li #calendar class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === calendar}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,calendar)">
								<i class="topbar-icon pi pi-calendar"></i>
							</a>
							<ul class="fadeInDown" (click)="appMain.topbarItemClick = true">
								<li class="layout-submenu-header">
									<h1>Calendar</h1>
								</li>
								<li class="calendar">
                                    <p-calendar [inline]="true"></p-calendar>
								</li>
							</ul>
						</li> -->
						<li #message class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === message}">
							<!-- <a href="#" (click)="appMain.onTopbarItemClick($event,message)">
								<i class="topbar-icon pi pi-inbox"></i>
							</a> -->
							<ul class="fadeInDown" >
								<li class="layout-submenu-header">
									<h1>Messages</h1>
									<span>Today, you have new 4 messages</span>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-cayla.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Override the digital divide</p>
										<span>Cayla Brister</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gabie.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>Nanotechnology immersion</p>
										<span>Gabie Sheber</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-gaspar.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>User generated content</p>
										<span>Gaspar Antunes</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
								<li class="layout-submenu-item">
									<img src="assets/layout/images/topbar/avatar-tatiana.png" alt="mirage-layout" width="35" />
									<div class="menu-text">
										<p>The holistic world view</p>
										<span>Tatiana Gagelman</span>
									</div>
									<i class="pi pi-angle-right"></i>
								</li>
							</ul>
						</li>
<!-- 
						<li #gift class="topbar-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === gift}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,gift)">
								<i class="topbar-icon pi pi-envelope"></i>
							</a>
							<ul class="fadeInDown">
								<li class="layout-submenu-header">
									<h1>Deals</h1>
								</li>

								<li class="deals">
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-sapphire.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Sapphire</p>
												<span>Angular</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-roma.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Roma</p>
												<span>Minimalism</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-babylon.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Babylon</p>
												<span>Powerful</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
									<ul>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-harmony.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Harmony</p>
												<span>USWDS</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-prestige.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Prestige</p>
												<span>Elegancy</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
										<li>
											<img src="assets/layout/images/topbar/deal-icon-ultima.png" alt="mirage-layout" width="35" />
											<div class="menu-text">
												<p>Ultima</p>
												<span>Material</span>
											</div>
											<i class="pi pi-angle-right"></i>
										</li>
									</ul>
								</li>
							</ul>
						</li> -->

						<li #profile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === profile}">
							<a href="#" (click)="appMain.onTopbarItemClick($event,profile)" >
                            <span class="profile-image-wrapper" >
							<i style="color:white" class="pi pi-user"></i>                            </span>
								<span style="color:white"class="profile-info-wrapper">
                                <h3 style="color:white">{{name}}</h3>
                                <span style="color:white">{{institutionName}}</span>
								<!-- sa -->
                            </span>
							</a>
							<ul class="profile-item-submenu fadeInDown" (click)="appMain.topbarItemClick = true">
								<li class="profile-submenu-header justify-content-center">
									
									<div class="profile align-items-center">
									<i style="color:white" class="pi pi-user"></i>										<h1>{{name}}</h1>
										<span>{{roleType}}</span>
									</div>
								</li>
							
								
								<li class="layout-submenu-footer">
									<button style="color:white" routerLink="/hesap/giris" (click)="localRemove()" class="signout-button">Çıkış Yap</button>
								
								</li>
							</ul>
						</li>
					
                    </ul>

					<ul class="profile-mobile-wrapper">
						<li #mobileProfile class="topbar-item profile-item" [ngClass]="{'active-topmenuitem': appMain.activeTopbarItem === mobileProfile}">
						
                   
								<span class="profile-info-wrapper">
									<div class="d-flex justify-content-around align-items-center">
								<div style="text-align: center;">
                                <h3>{{name}}</h3>
                                <span>{{roleType}}</span>
								</div>
								<div>									
									<button routerLink="/hesap/giris" (click)="localRemove()" class="p-button-outlined " style="border:none;width:60px;border-radius:4px">Çıkış</button>
								</div>
								</div>
                            </span>
							
							<ul class="fadeInDown" (click)="appMain.topbarItemClick = true">
								<li class="profile-submenu-header justify-content-center">
								
									<div class="profile row text-center  align-items-center">
										<img src="assets/layout/images/topbar/avatar-eklund.png" style="width: 100px;" alt="mirage-layout" width="45" />
										<h1>{{name}}</h1>
										<span>{{roleType}}</span>
									</div>
								</li>
							
								<li class="layout-submenu-footer">
									<button routerLink="/hesap/giris" class="signout-button">Çıkış</button>
				
								</li>
							</ul>
						</li>
					</ul>
                </div>
            </div>
        </div>
    `
})
export class AppTopBarComponent implements OnInit {

	activeItem: number;
	colorChange: boolean = true;
	name = "test"
	roleType = ""
	institutionName = "";

	constructor(public appMain: AppMainComponent) { }
	ngOnInit(): void {
		// this.name = JSON.parse(localStorage.getItem('user_info')).fullName
		// console.log('JSON.parse(localStorage.getItem(user_info)): ', JSON.parse(localStorage.getItem('user_info')));
		// this.institutionName = JSON.parse(localStorage.getItem('user_info'))?.jwtDto?.institutionName
		// // this.takeRole()
	}

	mobileMegaMenuItemClick(index) {
		this.appMain.megaMenuMobileClick = true;
		this.activeItem = this.activeItem === index ? null : index;
	}
	colorChanger() {
		this.colorChange = !this.colorChange;
	}
	localRemove() {
		localStorage.removeItem("auth_token")
		localStorage.removeItem("_grecaptcha")
		localStorage.removeItem("user_info")

	}
	takeRole() {
		if (RoleTypeEnum.ASM == JSON.parse(localStorage.getItem('user_info'))?.jwtDto.roleGuid) {

			this.roleType = "ASM";
		} else if (RoleTypeEnum.İSM == JSON.parse(localStorage.getItem('user_info'))?.jwtDto.roleGuid) {
			this.roleType = "İSM";

		} else if (RoleTypeEnum.SBA == JSON.parse(localStorage.getItem('user_info'))?.jwtDto.roleGuid) {
			this.roleType = "SBA";
		}
		else if (RoleTypeEnum.ADMIN == JSON.parse(localStorage.getItem('user_info'))?.jwtDto.roleGuid) {
			this.roleType = "Admin Hesabı";
		}

	}
}
