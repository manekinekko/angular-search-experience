import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Output() change: EventEmitter<string>;

  searchGroup: FormGroup;

  constructor() {
    this.change = new EventEmitter();
    this.searchGroup = new FormGroup({
      query: new FormControl('')
    });
  }

  ngOnInit() {
    this.searchGroup.valueChanges
      .pipe(
        // prettier-ignore
        map(event => event.query),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.change.emit(value);
      });
  }

  clear() {
    (this.searchGroup.controls.query as FormControl).setValue('');
  }

  isEmptyInput() {
    return this.searchGroup.controls.query.value === '';
  }
}
