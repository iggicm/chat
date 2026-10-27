import {appTestModule} from '../testing/app-test-module';
import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { AuthenticateGuard } from './authenticate.guard';

describe('AuthenticateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(appTestModule());
  });

  it('should ...', inject([AuthenticateGuard], (guard: AuthenticateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
