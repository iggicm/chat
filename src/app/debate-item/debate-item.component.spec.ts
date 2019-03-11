import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateItemComponent } from './debate-item.component';

describe('DebateItemComponent', () => {
  let component: DebateItemComponent;
  let fixture: ComponentFixture<DebateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
