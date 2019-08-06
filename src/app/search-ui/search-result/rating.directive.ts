import { Directive, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

export const MAX_RATING = 5;

/**
 * This directive is used to render a number of stars based on a given rating number (one star be 1—unit)
 * If the rating is half unit (0.5), a half star will be rendered.
 */
@Directive({
  selector: 'span[appRating]'
})
export class RatingDirective implements OnInit {
  @Input() rating = 0;

  constructor(private renderer: Renderer2, private host: ElementRef) {}

  ngOnInit() {
    const icons = document.createElement('span');

    const ceilRating = Math.ceil(this.rating);
    const floorRating = Math.floor(this.rating);
    const ifHalf = ceilRating - this.rating === 0.5;

    const fragment = [
      ...Array(floorRating).fill('<i class="material-icons">star</i>'),
      ifHalf ? '<i class="material-icons">star_half</i>' : '',
      ...Array(MAX_RATING - ceilRating).fill('<i class="material-icons">star_border</i>')
    ].join('');

    this.renderer.setProperty(this.host.nativeElement, 'innerHTML', fragment);
    this.renderer.setStyle(this.host.nativeElement, 'color', '#FBBF75');
  }
}
