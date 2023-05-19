import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  model=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
  imageUrl="https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"
  scrollControl=false
  lastKnownScrollPosition=0
    constructor() { }
    nabe="url('../../../../assets/img/Umke.jpg')"
    ngOnInit(): void {
      document.addEventListener("scroll", (event) => {
  
       let element=<HTMLElement> document.getElementById('topbar');
       let element2=<HTMLElement> document.getElementById('sticky-panel');
       if( this.lastKnownScrollPosition<window.scrollY &&window.scrollY>229){
        if(window.scrollY>429){
  element2.classList.add('nav-coming')
        }
        element.classList.add('nav-going');
  
       }else {
  
        if(window.scrollY<429){
          element2.classList.remove('nav-coming')
                }
        element.classList.remove('nav-going');
  
  
       }
       this.lastKnownScrollPosition = window.scrollY;
      console.log( this.lastKnownScrollPosition)
      });
    }
  
    
    customOptions: OwlOptions = {
      autoWidth: true,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      autoplay:false,
      margin:10,
      autoplaySpeed:300,
      navSpeed: 700,
      navText: ['<i class="pi pi-chevron-left"></i>', '<i class="pi pi-chevron-right"></i>'],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
      
        768: {
          items: 4
        },
        991:{
          items: 5
        },
        1200: {
          items: 6
        },
        1400: {
          items: 7
        },
        1600: {
          items: 8
        },
        1800: {
          items: 9
        },
        2000: {
          items: 10
        },
      },
      nav: true
    }

}
