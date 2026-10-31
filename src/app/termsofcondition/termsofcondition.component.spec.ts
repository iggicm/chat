import {appTestModule} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofconditionComponent } from './termsofcondition.component';

describe('TermsofconditionComponent', () => {
  let component: TermsofconditionComponent;
  let fixture: ComponentFixture<TermsofconditionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
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
