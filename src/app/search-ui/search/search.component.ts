import { SearchService, Application } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { filter, switchMap, share, switchMapTo } from 'rxjs/operators';
import { AlgoliaService } from '@app/core/algolia/algolia.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  hitsPerPage = 20;
  applications: Application[];
  isInfiniteScrollRequested: boolean;
  lastResultCount = Infinity;

  constructor(private search: AlgoliaService, public snackBar: MatSnackBar) {
    this.applications = [];
    this.search.configure({
      hitsPerPage: this.hitsPerPage
    });
  }

  ngOnInit() {
    this.search.resultState$.subscribe(content => {
      this.lastResultCount = content.hits.length;
      console.log(this.lastResultCount);

      if (this.isInfiniteScrollRequested) {
        this.applications = this.applications.concat(content.hits);
      } else {
        this.applications = content.hits;
      }

      this.isInfiniteScrollRequested = false;
    });
    this.search.errorState$.subscribe(content => {
      this.applications = [];
    });
    this.search.searchState$.subscribe(content => {
      if (this.isInfiniteScrollRequested) {
        this.openSnackBar();
      }
    });
    this.search.changeState$.subscribe(content => {});
  }

  onSearchInputChange(query: string) {
    this.search.search(query);
  }

  onSearchInputClear() {
    this.applications = [];
  }

  onScroll() {
    if (this.lastResultCount >= this.hitsPerPage && this.applications.length > 0) {
      this.isInfiniteScrollRequested = true;
      this.search.nextPage();
    }
  }

  openSnackBar() {
    this.snackBar.open('Loading more content...', '', {
      duration: 500
    });
  }
}
