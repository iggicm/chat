import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateToCloseComponent } from './debate-to-close.component';

describe('DebateToCloseComponent', () => {
  let component: DebateToCloseComponent;
  let fixture: ComponentFixture<DebateToCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateToCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateToCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
