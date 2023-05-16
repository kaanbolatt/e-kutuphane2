import { Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	template: `
        <div class="layout-footer " style="background-color:white;color:black;height:unset;position: sticky;width:100%;z-index:2;justify-content:space-between;padding:10px 30px;min-height:100px">
		
                <div class="layout-topbar-left ">
             

                    <div class=" d-flex">
                        <img src="assets/img/black-logo.png" style="width:50px" alt="">
                        <div class="ml-3">
                            <h4 style="margin-bottom:0;font-weight:bold">T.C. SAĞLIK BAKANLIĞI</h4>
                            <strong style="font-size:12px">SAĞLIK BİLGİ SİSTEMLERİ GENEL MÜDÜRLÜĞÜ</strong>
                        </div>
                    </div>
                  
           
                </div>
                <div class="layout-topbar-right fadeInDown d-md-flex d-none justify-content-center align-items-center">
					Başa Dön
					<div class="scroll-up" (click)="scrollUp()" style="">
				<i class="pi pi-chevron-up"></i>
				</div>
                </div>


			
        </div>
		
   
    `
})
export class AppFooterComponent {
	scrollUp(){
		window.scrollTo(0, 0);
	}
}
