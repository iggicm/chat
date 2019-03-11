import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateModeratorCandidatureComponent } from './debate-moderator-candidature.component';

describe('DebateModeratorCandidatureComponent', () => {
  let component: DebateModeratorCandidatureComponent;
  let fixture: ComponentFixture<DebateModeratorCandidatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateModeratorCandidatureComponent ]
    })
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
