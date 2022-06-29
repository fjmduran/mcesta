import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FryptoComponent } from './frypto.component';

describe('FryptoComponent', () => {
  let component: FryptoComponent;
  let fixture: ComponentFixture<FryptoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FryptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
