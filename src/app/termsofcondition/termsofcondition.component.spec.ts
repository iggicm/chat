import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofconditionComponent } from './termsofcondition.component';

describe('TermsofconditionComponent', () => {
  let component: TermsofconditionComponent;
  let fixture: ComponentFixture<TermsofconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsofconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
