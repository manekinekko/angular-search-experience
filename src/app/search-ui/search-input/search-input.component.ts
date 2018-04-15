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
  @Output() query: EventEmitter<string>;
  @Output() clear: EventEmitter<void>;

  searchGroup: FormGroup;

  constructor() {
    this.query = new EventEmitter();
    this.clear = new EventEmitter();
    this.searchGroup = new FormGroup({
      query: new FormControl('')
    });
  }

  ngOnInit() {
    this.searchGroup.valueChanges
      .pipe(
        // prettier-ignore
        map(event => event.query),
        // debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value.length === 0) {
          this.clear.emit();
        } else {
          this.query.emit(value);
        }
      });
  }

  clearValue() {
    (this.searchGroup.controls.query as FormControl).setValue('');

    this.clear.emit();
  }

  isEmptyInput() {
    return this.searchGroup.controls.query.value === '';
  }
}
