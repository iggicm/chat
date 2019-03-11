import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDebateComponent } from './open-debate.component';

describe('OpenDebateComponent', () => {
  let component: OpenDebateComponent;
  let fixture: ComponentFixture<OpenDebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
