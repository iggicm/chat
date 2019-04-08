import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateElementComponent } from './debate-element.component';

describe('DebateElementComponent', () => {
  let component: DebateElementComponent;
  let fixture: ComponentFixture<DebateElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
