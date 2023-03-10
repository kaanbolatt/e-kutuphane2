import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';


const routes: Routes = [
    //USER AREA
    //ADMİN AREA

    { path: '', component: BooksComponent },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SozlesmeRoutingModule { }
