import {CommonModule} from '@angular/common';
import {Component, Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, OnDestroy, OnInit, Output} from '@angular/core';

export interface ScrollEvent {
  originalEvent: Event;
  isReachingBottom: boolean;
  isReachingTop: boolean;
  isWindowEvent: boolean;
}

@Directive({selector: '[detect-scroll]', standalone: false})
export class ScrollDirective {
  @Output() onScroll = new EventEmitter<ScrollEvent>();
  constructor(private element: ElementRef<HTMLElement>) {}
  @HostListener('scroll', ['$event']) scroll(originalEvent: Event) {
    const el = this.element.nativeElement;
    this.onScroll.emit({originalEvent, isReachingBottom: el.scrollTop + el.clientHeight >= el.scrollHeight - 1,
      isReachingTop: el.scrollTop <= 0, isWindowEvent: false});
  }
}

@Component({selector: 'slideshow', standalone: false, template: `
  <a *ngIf="imageUrls.length" [href]="activeImage.href || activeImage.url" (click)="activate($event)">
    <img [src]="activeImage.url" [attr.loading]="lazyLoad ? 'lazy' : 'eager'" alt="IGGI" [style.height]="height" [style.min-height]="minHeight"
      style="width:100%;object-fit:cover" />
  </a>`})
export class SlideshowComponent implements OnInit, OnDestroy {
  @Input() height = '525px';
  @Input() minHeight = '525px';
  @Input() imageUrls: (string | {url: string; href?: string; clickAction?: Function})[] = [];
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 5000;
  @Input() showArrows = false;
  @Input() lazyLoad = false;
  @Input() autoPlayWaitForLazyLoad = true;
  @Input() disableSwiping = true;
  index = 0;
  private timer?: ReturnType<typeof setInterval>;
  get activeImage() {
    const image = this.imageUrls[this.index];
    return typeof image === 'string' ? {url: image} : image;
  }
  activate(event: MouseEvent) {
    if (this.activeImage.clickAction) {
      event.preventDefault();
      this.activeImage.clickAction();
    }
  }
  ngOnInit() {
    if (this.autoPlay) this.timer = setInterval(() => {
      if (this.imageUrls.length) this.index = (this.index + 1) % this.imageUrls.length;
    }, this.autoPlayInterval);
  }
  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }
}

@NgModule({declarations: [ScrollDirective, SlideshowComponent], imports: [CommonModule], exports: [ScrollDirective, SlideshowComponent]})
export class LegacyWidgetsModule {}
