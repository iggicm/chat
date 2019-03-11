import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestdebatesComponent } from './suggestdebates.component';

describe('SuggestdebatesComponent', () => {
  let component: SuggestdebatesComponent;
  let fixture: ComponentFixture<SuggestdebatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestdebatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestdebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
