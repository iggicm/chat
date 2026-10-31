import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {SafePipe} from './safe.pipe';

describe('SafePipe', () => {
  it('delegates resource URLs to the Angular sanitizer', () => {
    const sanitizer = TestBed.inject(DomSanitizer);
    const expected = sanitizer.bypassSecurityTrustResourceUrl('https://example.com/document');
    spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue(expected);
    expect(new SafePipe(sanitizer).transform('https://example.com/document')).toBe(expected);
    expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith('https://example.com/document');
  });
});
