import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationitemComponent } from './applicationitem.component';

describe('ApplicationitemComponent', () => {
  let component: ApplicationitemComponent;
  let fixture: ComponentFixture<ApplicationitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
