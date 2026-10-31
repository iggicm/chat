import {appTestModule} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDebatesComponent } from './closed-debates.component';

describe('ClosedDebatesComponent', () => {
  let component: ClosedDebatesComponent;
  let fixture: ComponentFixture<ClosedDebatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedDebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
