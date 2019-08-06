import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { take } from 'rxjs/internal/operators/take';

export interface Category {
  name: string;
  count: number;
  isRefined: boolean;
  _dirty?: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() categories: Category[];
  @Output() selectionChanged: EventEmitter<Category>;

  constructor() {
    this.selectionChanged = new EventEmitter();
  }

  ngOnInit() {}

  /**
   * Emits a Category on selection change.
   * @param category The category to be emitted.
   */
  onSelectionChanged(category: Category) {
    if (category._dirty) {
      this.selectionChanged.emit(category);
    }
  }

  /**
   * Select or unselect a Category. Trick: we take advantage of the existing "isRefined" property
   * as a selection flag.
   * @param category The category to be selected/unselected.
   */
  toggleSelected(category: Category) {
    category._dirty = true;
    category.isRefined = !category.isRefined;
  }
}
