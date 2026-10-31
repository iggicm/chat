import {appTestModule, testDebate} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateToCloseComponent } from './debate-to-close.component';

describe('DebateToCloseComponent', () => {
  let component: DebateToCloseComponent;
  let fixture: ComponentFixture<DebateToCloseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateToCloseComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('debate', {...testDebate});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
