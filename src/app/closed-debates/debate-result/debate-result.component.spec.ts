import {appTestModule, testDebate} from '../../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateResultComponent } from './debate-result.component';

describe('DebateResultComponent', () => {
  let component: DebateResultComponent;
  let fixture: ComponentFixture<DebateResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateResultComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('debateResult', {debate: {...testDebate}, issue: '+'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
