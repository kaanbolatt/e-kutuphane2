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
  constructor() { }
  nabe="url('../../../../assets/img/Umke.jpg')"
  ngOnInit(): void {
  }
  scrollRight() {

    var leftPos = $('div.outer_container').scrollLeft();
    console.log(leftPos);
    $("div.outer_container").animate({
      scrollLeft: leftPos + 300
    }, 800);

  }
  scrollLeft() {
    var leftPos = $('div.outer_container').scrollLeft();
    console.log(leftPos);
    $("div.outer_container").animate({
      scrollLeft: leftPos - 300
    }, 800);
  }
  scrollRight2() {

    var leftPos = $('div.outer_container2').scrollLeft();
    console.log(leftPos);
    $("div.outer_container2").animate({
      scrollLeft: leftPos + 300
    }, 800);

  }
  scrollLeft2() {
    var leftPos = $('div.outer_container2').scrollLeft();
    console.log(leftPos);
    $("div.outer_container2").animate({
      scrollLeft: leftPos - 300
    }, 800);
  }
}

