import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Inject,
  Output
} from "@angular/core";
import { debounceTime, filter, map } from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Directive({
  selector: "[appInfiniteScroll]"
})
export class InfiniteScrollDirective implements AfterViewInit {
  @Output() scroll = new EventEmitter();

  private scrollEvent$;
  private userScrolledDown$;
  threshold = 300;

  constructor(@Inject(DOCUMENT) private document) {
    this.scrollEvent$ = fromEvent(window, "scroll");
    this.userScrolledDown$ = this.scrollEvent$.pipe(
      map(() => window.scrollY),
      debounceTime(200),
      filter(
        (current: number) =>
          current >=
          document.body.clientHeight - window.innerHeight - this.threshold
      )
    );
  }

  ngAfterViewInit() {
    this.userScrolledDown$.subscribe(event => {
      this.scroll.emit();
    });
  }
}
