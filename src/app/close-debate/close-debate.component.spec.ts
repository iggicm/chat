import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseDebateComponent } from './close-debate.component';

describe('CloseDebateComponent', () => {
  let component: CloseDebateComponent;
  let fixture: ComponentFixture<CloseDebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseDebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
