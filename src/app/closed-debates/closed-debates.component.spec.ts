import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDebatesComponent } from './closed-debates.component';

describe('ClosedDebatesComponent', () => {
  let component: ClosedDebatesComponent;
  let fixture: ComponentFixture<ClosedDebatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedDebatesComponent ]
    })
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
