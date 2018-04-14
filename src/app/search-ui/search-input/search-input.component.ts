import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Output() searchInput: EventEmitter<string>;

  search: FormGroup;

  constructor() {
    this.searchInput = new EventEmitter();
    this.search = new FormGroup({
      value: new FormControl()
    });
  }

  ngOnInit() {
    this.search.valueChanges.pipe(
      // Only if the text is longer than 2 characters
      map(event => event.value),
      // Only if the value has changed
      distinctUntilChanged()
    )
    .subscribe(value => {
      this.searchInput.emit(value);
    });
  }
}
