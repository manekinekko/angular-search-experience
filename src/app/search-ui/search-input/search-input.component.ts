import { DeeplinkService } from './../deeplink.service';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, AfterContentInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  @Output() query: EventEmitter<string>;
  @Output() clear: EventEmitter<void>;

  searchGroup: FormGroup;

  constructor(private deeplink: DeeplinkService) {
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
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value.length === 0) {
          this.clear.emit();
          this.deeplink.syncUrl({
            q: null
          });
        } else {
          this.query.emit(value);
          this.deeplink.syncUrl({
            q: value
          });
        }
      });
  }

  /**
   * Wait till the inner content of this component has been initialised and renderered,
   * and then set the focus on the input and register the DeepLink service.
   */
  ngAfterContentInit() {
    this.inputRef.nativeElement.focus();
    this.deeplink.registerFormGroup(this.searchGroup);
  }

  clearValue() {
    (this.searchGroup.controls.query as FormControl).setValue('');

    this.clear.emit();
  }

  isEmptyInput() {
    return this.searchGroup.controls.query.value === '';
  }
}
