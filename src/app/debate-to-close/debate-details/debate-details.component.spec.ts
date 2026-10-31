import {appTestModule} from '../../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateDetailsComponent } from './debate-details.component';

describe('DebateDetailsComponent', () => {
  let component: DebateDetailsComponent;
  let fixture: ComponentFixture<DebateDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
