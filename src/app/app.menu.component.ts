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
                    icon: '', label: 'Tüm Yayınlar',
                }
                ,
                {
                    label: 'Makaleler', icon: 'Kitaplar', 
                }
                ,
                {
                    label: 'Makaleler', icon: 'Makaleler', 
                   
                },
                {
                    label: 'Dergiler', icon: 'Dergiler',
                   
                },
                {
                    label: 'SSS', icon: 'SSS',
                   
                },
            ];
      
       
          
        
        
        }
      
    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
