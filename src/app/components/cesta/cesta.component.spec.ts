import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CestaComponent } from './cesta.component';

describe('CestaComponent', () => {
  let component: CestaComponent;
  let fixture: ComponentFixture<CestaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
