import {appTestModule} from '../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateListComponent } from './debate-list.component';

describe('DebateListComponent', () => {
  let component: DebateListComponent;
  let fixture: ComponentFixture<DebateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
