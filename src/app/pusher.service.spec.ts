import {appTestModule} from '../testing/app-test-module';
import { TestBed } from '@angular/core/testing';

import { PusherService } from './pusher.service';

describe('PusherService', () => {
  beforeEach(() => TestBed.configureTestingModule(appTestModule()));

  it('should be created', () => {
    const service: PusherService = TestBed.inject(PusherService);
    expect(service).toBeTruthy();
  });
});
