import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestdebateComponent } from './suggestdebate.component';

describe('SuggestdebateComponent', () => {
  let component: SuggestdebateComponent;
  let fixture: ComponentFixture<SuggestdebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestdebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestdebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
