import {appTestModule} from '../../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumedDebatesComponent } from './resumed-debates.component';

describe('ResumedDebatesComponent', () => {
  let component: ResumedDebatesComponent;
  let fixture: ComponentFixture<ResumedDebatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumedDebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
