import { debounceTime, map, filter } from 'rxjs/operators';
import { Directive, AfterViewInit, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../core/window-ref.service';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {
  @Output() scroll = new EventEmitter();

  private scrollEvent$;
  private userScrolledDown$;
  threshold = 300;

  constructor(
    @Inject(DOCUMENT) private document,
    @Inject(WINDOW) private window,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.scrollEvent$ = fromEvent(this.window, 'scroll');
    this.userScrolledDown$ = this.scrollEvent$.pipe(
      map(() => this.window.scrollY),
      debounceTime(200),
      filter((current: number) => current >= document.body.clientHeight - this.window.innerHeight - this.threshold)
    );
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userScrolledDown$.subscribe(event => {
        this.scroll.emit();
      });
    }
  }
}
