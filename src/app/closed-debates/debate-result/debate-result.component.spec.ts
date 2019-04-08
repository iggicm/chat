import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateResultComponent } from './debate-result.component';

describe('DebateResultComponent', () => {
  let component: DebateResultComponent;
  let fixture: ComponentFixture<DebateResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
