import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYayinComponent } from './list-yayin.component';

describe('ListYayinComponent', () => {
  let component: ListYayinComponent;
  let fixture: ComponentFixture<ListYayinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYayinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListYayinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
