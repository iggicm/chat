import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeUserAsAdminComponent } from './propose-user-as-admin.component';

describe('ProposeUserAsAdminComponent', () => {
  let component: ProposeUserAsAdminComponent;
  let fixture: ComponentFixture<ProposeUserAsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposeUserAsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeUserAsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
