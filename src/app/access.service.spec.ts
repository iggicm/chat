import {appTestModule} from '../testing/app-test-module';
import { TestBed } from '@angular/core/testing';

import { AccessService } from './access.service';

describe('AccessService', () => {
  beforeEach(() => TestBed.configureTestingModule(appTestModule()));

  it('should be created', () => {
    const service: AccessService = TestBed.inject(AccessService);
    expect(service).toBeTruthy();
  });
});
