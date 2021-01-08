import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GrouplistComponent } from './grouplist.component';

describe('GrouplistComponent', () => {
  let component: GrouplistComponent;
  let fixture: ComponentFixture<GrouplistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
