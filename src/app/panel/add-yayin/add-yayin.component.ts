import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-yayin',
  templateUrl: './add-yayin.component.html',
  styleUrls: ['./add-yayin.component.scss']
})
export class AddYayinComponent implements OnInit {
  selected = 2
  constructor(
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (Number(this.route.queryParams['_value'].yayinTuru)) {
        this.selected = Number(this.route.queryParams['_value'].yayinTuru)
    }
  }

}
