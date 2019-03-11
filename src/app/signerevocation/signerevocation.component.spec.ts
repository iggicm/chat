import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerevocationComponent } from './signerevocation.component';

describe('SignerevocationComponent', () => {
  let component: SignerevocationComponent;
  let fixture: ComponentFixture<SignerevocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignerevocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignerevocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
