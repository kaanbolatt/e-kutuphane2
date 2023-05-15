import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
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

  
  scrollRight() {

    var leftPos = $('div.outer_container').scrollLeft();
    console.log(leftPos);
    $("div.outer_container").animate({
      scrollLeft: leftPos + 224
    }, 800);

  }
  scrollLeft() {
    var leftPos = $('div.outer_container').scrollLeft();
    console.log(leftPos);
    $("div.outer_container").animate({
      scrollLeft: leftPos - 224
    }, 800);
  }
  scrollRight2() {

    var leftPos = $('div.outer_container2').scrollLeft();
    console.log(leftPos);
    $("div.outer_container2").animate({
      scrollLeft: leftPos + 224
    }, 800);

  }
  scrollLeft2() {
    var leftPos = $('div.outer_container2').scrollLeft();
    console.log(leftPos);
    $("div.outer_container2").animate({
      scrollLeft: leftPos - 224
    }, 800);
  }
}

