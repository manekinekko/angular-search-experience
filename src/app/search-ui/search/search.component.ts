import { SearchService, Application } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  entries$: Observable<Application[]>;

  constructor(private search: SearchService) {}

  ngOnInit() {}

  onSearchInput(value: string) {
    this.entries$ = this.search.fetchMocks(value);
  }
}
