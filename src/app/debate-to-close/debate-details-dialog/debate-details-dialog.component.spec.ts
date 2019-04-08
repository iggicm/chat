import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateDetailsDialogComponent } from './debate-details-dialog.component';

describe('DebateDetailsDialogComponent', () => {
  let component: DebateDetailsDialogComponent;
  let fixture: ComponentFixture<DebateDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebateDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
