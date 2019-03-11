import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeMemberComponent } from './revoke-member.component';

describe('RevokeMemberComponent', () => {
  let component: RevokeMemberComponent;
  let fixture: ComponentFixture<RevokeMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
