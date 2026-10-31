import {ElementRef} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {ScrollDirective, SlideshowComponent} from './legacy-widgets.module';

describe('Replacement widgets', () => {
  it('reports scroll boundaries for loading older and newer comments', () => {
    const element = {scrollTop: 0, clientHeight: 100, scrollHeight: 300};
    const directive = new ScrollDirective(new ElementRef(element as HTMLElement));
    const events: {isReachingTop: boolean; isReachingBottom: boolean}[] = [];
    directive.onScroll.subscribe(event => events.push(event));
    directive.scroll(new Event('scroll'));
    element.scrollTop = 200;
    directive.scroll(new Event('scroll'));
    expect(events[0].isReachingTop).toBeTrue();
    expect(events[0].isReachingBottom).toBeFalse();
    expect(events[1].isReachingBottom).toBeTrue();
    expect(events[1].isReachingTop).toBeFalse();
  });

  it('cycles slides and stops the timer when the view is destroyed', fakeAsync(() => {
    const slideshow = new SlideshowComponent();
    slideshow.imageUrls = ['first.png', 'second.png'];
    slideshow.autoPlayInterval = 100;
    slideshow.ngOnInit();
    tick(100);
    expect(slideshow.activeImage.url).toBe('second.png');
    tick(100);
    expect(slideshow.activeImage.url).toBe('first.png');
    slideshow.ngOnDestroy();
    tick(100);
    expect(slideshow.activeImage.url).toBe('first.png');
  }));

  it('preserves custom slide click actions', () => {
    const slideshow = new SlideshowComponent();
    const clickAction = jasmine.createSpy('clickAction');
    slideshow.imageUrls = [{url: 'slide.png', clickAction}];
    const event = new MouseEvent('click', {cancelable: true});
    slideshow.activate(event);
    expect(clickAction).toHaveBeenCalled();
    expect(event.defaultPrevented).toBeTrue();
  });
});
