import {appTestModule} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeUserAsAdminComponent } from './propose-user-as-admin.component';

describe('ProposeUserAsAdminComponent', () => {
  let component: ProposeUserAsAdminComponent;
  let fixture: ComponentFixture<ProposeUserAsAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeUserAsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
