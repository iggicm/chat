import {appTestModule} from '../testing/app-test-module';
import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';

describe('ImageService', () => {
  beforeEach(() => TestBed.configureTestingModule(appTestModule()));

  it('should be created', () => {
    const service: FileService = TestBed.inject(FileService);
    expect(service).toBeTruthy();
  });
});
