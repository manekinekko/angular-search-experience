import { Component, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { filter, switchMap, share, switchMapTo } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AlgoliaService } from '@app/core/algolia/algolia.service';
import { Category } from '../facets/category/category.component';
import { SearchService, Application } from './../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  hitsPerPage = 20;
  private _applications: Application[];
  set applications(value: Application[]) {
    if (!value || value.length === 0) {
      // reset the component local state
      this.isInfiniteScrollRequested = false;
      this.lastResultCount = Infinity;
    }

    this._applications = value;
  }

  get applications() {
    return this._applications;
  }

  searchCategories: Category[];
  isInfiniteScrollRequested: boolean;
  lastResultCount = Infinity;

  constructor(private search: AlgoliaService, public snackBar: MatSnackBar) {
    this.applications = [];
    this.searchCategories = [];
    this.search.configure({
      hitsPerPage: this.hitsPerPage
    });
  }

  ngOnInit() {
    this.search.resultState$.subscribe(content => {
      const categoriesFacet = content.getFacetValues('category') as any[];
      if (categoriesFacet.length > 1) {
        this.searchCategories = categoriesFacet;
      }

      this.lastResultCount = content.hits.length;

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

  filterByCategory(category: Category) {
    this.search.toggleFacetRefinement({
      name: 'category',
      query: category.name
    });
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
