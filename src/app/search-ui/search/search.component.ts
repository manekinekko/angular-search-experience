import { SearchService, Application } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { filter, switchMap, share, switchMapTo } from 'rxjs/operators';
import { AlgoliaService } from '@app/core/algolia/algolia.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  applications: Application[];

  constructor(private search: AlgoliaService) {
    this.applications = [];
  }

  ngOnInit() {
    this.search.resultState$.subscribe(content => {
      console.log(content);
      this.applications = content.hits;
    });
    this.search.errorState$.subscribe(content => {
      console.log('error', content);
    });
    this.search.searchState$.subscribe(content => {
      console.log('search', content);
    });
  }

  onSearchInputChange(query: string) {
    this.search.searh(query);
    // this.search.fetchMocks(query).subscribe(applications => (this.applications = applications));
  }

  onSearchInputClear() {
    this.applications = [];
  }
}
