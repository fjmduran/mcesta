import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectProductsListComponent } from './select-products-list.component';

describe('SelectProductsListComponent', () => {
  let component: SelectProductsListComponent;
  let fixture: ComponentFixture<SelectProductsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
