import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumedDebatesComponent } from './resumed-debates.component';

describe('ResumedDebatesComponent', () => {
  let component: ResumedDebatesComponent;
  let fixture: ComponentFixture<ResumedDebatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumedDebatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumedDebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
