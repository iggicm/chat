import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFileDialogComponent } from './show-file-dialog.component';

describe('ShowFileDialogComponent', () => {
  let component: ShowFileDialogComponent;
  let fixture: ComponentFixture<ShowFileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
