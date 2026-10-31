import {appTestModule} from '../../../testing/app-test-module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateModeratorCandidatureComponent } from './debate-moderator-candidature.component';

describe('DebateModeratorCandidatureComponent', () => {
  let component: DebateModeratorCandidatureComponent;
  let fixture: ComponentFixture<DebateModeratorCandidatureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(appTestModule())
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateModeratorCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
