import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { RoleTypeEnum } from './shared/enums/role-type.enum';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        
    
     
       
    
            this.model = [
                {
                    icon: 'pi  pi-alluser', label: 'Personel Havuzu',  routerLink: ['/kullanici-listesi'],
                }
                ,
                {
                    label: 'Firma İşlemleri', icon: 'pi  pi-document', routerLink: ['/firma-listesi']
                }
                ,
                {
                    label: 'Vpn İşlemleri', icon: 'pi pi-earth', routerLink: ['/vpn-listesi']
                   
                },
                {
                    label: 'Sistem Yönetimi', icon: 'pi pi-set',
                   
                },
            ];
      
       
          
        
        
        }
      
    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
