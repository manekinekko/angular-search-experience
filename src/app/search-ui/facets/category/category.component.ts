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

  onSelectionChanged(category: Category) {
    if (category._dirty) {
      this.selectionChanged.emit(category);
    }
  }

  toggleSelected(category: Category) {
    category._dirty = true;
    category.isRefined = !category.isRefined;
  }
}
