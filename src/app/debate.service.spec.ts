import {appTestModule} from '../testing/app-test-module';
import { TestBed } from '@angular/core/testing';

import { DebateService } from './debate.service';

describe('DebateService', () => {
  beforeEach(() => TestBed.configureTestingModule(appTestModule()));

  it('should be created', () => {
    const service: DebateService = TestBed.inject(DebateService);
    expect(service).toBeTruthy();
  });
});
