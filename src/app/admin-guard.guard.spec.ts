import {appTestModule} from '../testing/app-test-module';
import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { AdminGuardGuard } from './admin-guard.guard';

describe('AdminGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(appTestModule());
  });

  it('should ...', inject([AdminGuardGuard], (guard: AdminGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
