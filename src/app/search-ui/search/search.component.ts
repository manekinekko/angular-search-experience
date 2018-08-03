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
  applicationsCount = 0;
  sortOption = 'rating_desc';
  private _applications: Application[];

  /**
   * Reseting the state of the "appliations" property will automatically clear the list of the categories
   * reset the scroll behavior and reset the last count.
   *
   */
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

  /**
   * The categories (facets) computed for each search result.
   */
  searchCategories: Category[];

  /**
   * An internal flag used when an infinite scroll has be initiated.
   */
  isInfiniteScrollRequested: boolean;

  /**
   * Keep track of the previous count (number of hits).
   */
  lastResultCount = Infinity;

  constructor(private search: AlgoliaService, private snackBar: MatSnackBar) {
    this.applications = [];
    this.updateSearchCategories([]);
    this.search.setQueryParameter({
      hitsPerPage: this.hitsPerPage
    });
  }

  ngOnInit() {
    const handleResultSubscription = content => {
      this.applicationsCount = content.nbHits;

      const categoriesFacet = content.getFacetValues('category') as any[];
      if (categoriesFacet.length > 1) {
        this.updateSearchCategories(categoriesFacet);
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

  updateSearchCategories(newCategories: Category[]) {
    this.searchCategories = newCategories.sort((a, b) => a.name > b.name ? 1 : -1 );
  }
}
