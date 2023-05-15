import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYayinComponent } from './add-yayin.component';

describe('AddYayinComponent', () => {
  let component: AddYayinComponent;
  let fixture: ComponentFixture<AddYayinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYayinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddYayinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
