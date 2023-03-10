import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { RoleTypeEnum } from './shared/enums/role-type.enum';

@Component({
	selector: 'app-topbar',
	template: `


    <div class="layout-topbar" style="width: 100%;padding:20px;min-height:375px;z-index:1">
        <div class="layout-topbar-wrapper" style="height:100%;flex-direction:column;">
            <div style="display:flex;padding:5px 30px;">
                <div class="layout-topbar-left">
                    <div class="layout-topbar-logo-wrapper d-lg-none">


                        <a href="#" class="layout-topbar-logo">
                            <img style="width:50px" src="assets/img/saglik-bakanligi-logo.png" alt="">
                            <div class="ml-3">
                                <h4 style="margin-bottom:0;font-weight:bold;color:white;">T.C. SAĞLIK BAKANLIĞI</h4>
                                <strong class="d-none d-sm-block" style="font-size:12px;color:white;">SAĞLIK BİLGİ SİSTEMLERİ GENEL MÜDÜRLÜĞÜ</strong>
                            </div>
                        </a>
                    </div>

                    <div class="d-none d-lg-flex">
                        <img src="assets/img/saglik-bakanligi-logo.png" style="width:50px" alt="">
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
           
                </div>
                <div class="layout-topbar-right fadeInDown">
                    <ul class="right-menu navbar navbar-expand-lg ">
                        <li><a class="dropdown-item" href="#">Tüm yayınlar</a></li>
                        <li><a class="dropdown-item" href="#">Kitaplar</a></li>
                        <li><a class="dropdown-item" href="#"> Dergiler</a></li>
                        <li><a class="dropdown-item" href="#">Makeleler</a></li>
                        <li><a class="dropdown-item" href="#">Sıkça Sorulan Sorular</a></li>
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
            <div class="searchbar mt-5" style="width:100%;border-radius:100px;background-color:white;">


                <div class="row">
                    <div class="col-lg-6">
                        <div class="field text-start mt-4">
                            <div class="p-inputgroup  m-auto">
								<div class="d-flex align-items-center">
								<i style="font-size: 20px;" class="pi pi-search"></i>
								</div>
                         
                                    <input type="text" placeholder="Kütüphane içinde ara" class="p-inputtext p-component p-element" />
                                  
                             
                            </div>

                        </div>
                    </div>


                    <div class="col-lg-2">
                        <div class="field mt-4 ">

                            <app-dropdown [controllerName]="'Common'" [secondCheck]="true" [id]="'cityCode'" [methodName]="'CityList'" [placeholder]="'Şehir'">
                            </app-dropdown>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="field text-start mt-4">
                            <div class="p-inputgroup  m-auto">
                                <span class="p-float-label">
                                    <p-calendar class="three-side-input" selectionMode="range" [showIcon]="true" formControlName="createdDate" [placeholder]="'Oluşturma Tarih Aralığı'"></p-calendar>
                                    <label for="mail">Oluşturma Tarihi</label>
                                </span>
                            </div>

                        </div>
                    </div>
					<div class="col-lg-2 d-flex justify-content-center align-items-center">
						
						<button  class="search" style="width:100%;height:56px;border-radius: 100px;margin-right:15px;border:none;">Ara</button>
					</div>


                </div>

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
