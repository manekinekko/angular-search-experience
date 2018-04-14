import { SearchService, Application } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { filter, switchMap, share, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  applications: Application[];

  constructor(private search: SearchService) {
    this.applications = [];
  }

  ngOnInit() {}

  onSearchInputChange(query: string) {
    this.search.fetchMocks(query).subscribe(applications => (this.applications = applications));
  }
}
