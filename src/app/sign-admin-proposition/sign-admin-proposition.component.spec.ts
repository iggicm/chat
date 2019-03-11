import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignAdminPropositionComponent } from './sign-admin-proposition.component';

describe('SignAdminPropositionComponent', () => {
  let component: SignAdminPropositionComponent;
  let fixture: ComponentFixture<SignAdminPropositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignAdminPropositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignAdminPropositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
