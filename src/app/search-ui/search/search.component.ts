import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Observable, PartialObserver, Subject } from 'rxjs';
import { filter, switchMap, share, switchMapTo } from 'rxjs/operators';
import { MatSnackBar, MatButtonToggleChange } from '@angular/material';
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
  sortOption = 'rating_desc';
  private _applications: Application[];
  set applications(value: Application[]) {
    if (!value || value.length === 0) {
      // reset the component local state
      this.searchCategories = [];
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

  constructor(private search: AlgoliaService, private snackBar: MatSnackBar) {
    this.applications = [];
    this.searchCategories = [];
    this.search.configure({
      hitsPerPage: this.hitsPerPage
    });
  }

  ngOnInit() {
    const handleResultSubscription = content => {
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
    };

    this.search.searchState.result$.subscribe(handleResultSubscription);

    this.search.searchState.error$.subscribe(content => {
      this.applications = [];
    });
    this.search.searchState.search$.subscribe(content => {
      if (this.isInfiniteScrollRequested) {
        this.openSnackBar();
      }
    });
    this.search.searchState.change$.subscribe(content => {});
  }

  onSearchInputChange(query: string) {
    this.search.sortByRatingDesc(query);
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

  onSortOptionChange(changeEvent: MatButtonToggleChange) {
    switch (changeEvent.value) {
      case 'rating_desc':
        this.search.sortByRatingDesc();
        break;
      case 'price_asc':
        this.search.sortByPriceAsc();
        break;
      case 'relevance_desc':
      default:
        this.search.sortByRelevance();
    }
  }
}
