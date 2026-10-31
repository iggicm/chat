import {appTestModule} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerevocationComponent } from './signerevocation.component';

describe('SignerevocationComponent', () => {
  let component: SignerevocationComponent;
  let fixture: ComponentFixture<SignerevocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerevocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
