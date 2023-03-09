import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer" style="background-color:black;color:white;height:unset;position: sticky;width:100%;z-index:2">
		
			<div  class="d-flex justify-content-between align-items-center w-100">
				<div>©2023 T.C Sağlık Bakanlığı - Sağlık Bilgi Sistemleri Genel Müdürlüğü</div>
				<div>
					<span>©2023 T.C Sağlık Bakanlığı - Sağlık Bilgi Sistemleri Genel Müdürlüğü &nbsp; </span>
					<span>* &nbsp; </span>
					<span>Tel :+90 (312) 585 1000</span>

				</div>
			</div>
        </div>
    `
})
export class AppFooterComponent {

}
