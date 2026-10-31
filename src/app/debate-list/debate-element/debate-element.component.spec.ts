import {appTestModule, testDebate} from '../../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateElementComponent } from './debate-element.component';

describe('DebateElementComponent', () => {
  let component: DebateElementComponent;
  let fixture: ComponentFixture<DebateElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateElementComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('debate', {...testDebate});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
