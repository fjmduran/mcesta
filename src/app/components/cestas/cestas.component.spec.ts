import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CestasComponent } from './cestas.component';

describe('CestasComponent', () => {
  let component: CestasComponent;
  let fixture: ComponentFixture<CestasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
