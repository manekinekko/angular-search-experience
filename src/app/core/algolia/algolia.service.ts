import { Observable, Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import algoliasearchHelper from 'algoliasearch-helper';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX } from './injection-tokens';

export interface SearchState {
  search$: Observable<any>;
  result$: Observable<any>;
  change$: Observable<any>;
  error$: Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {
  indices = {
    applications: algoliasearchHelper,
    applications_by_rating_desc: algoliasearchHelper,
    applications_by_price_asc: algoliasearchHelper
  };
  client;

  searchState: SearchState;

  constructor(
    @Inject(ALGOLIA_APPLICATION_ID) private applicationID,
    @Inject(ALGOLIA_SEARCH_API_KEY) private searchApiKey,
    @Inject(ALGOLIA_INDEX) private indexName
  ) {
    this.client = window['algoliasearch'](applicationID, searchApiKey);

    this.searchState = {} as any;

    this.configureIndex('applications');
  }

  configureIndex(indexName: string) {
    this.indices[indexName] = algoliasearchHelper(this.client, indexName, {
      disjunctiveFacets: ['category']
    });

    this.searchState = {} as SearchState;

    // handle algolia events
    ['search', 'result', 'change', 'error'].forEach(eventName => {
      this.searchState[`${eventName}$`] = new Observable(observer => {
        const handler = e => observer.next(e);
        this.indices[indexName].on(eventName, handler);
        return () => this.indices[indexName].removeListener(eventName, handler);
      });
    });
  }

  configure(options) {
    this.indices.applications.setQueryParameter(options);
  }

  private search(indexName: string, query: string) {
    if (query.trim() !== '') {
      console.log(this.indices.applications.getIndex());
      this.indices.applications
        .setIndex(indexName)
        .setQuery(query)
        .search(error => {
          console.log(error.message);
          console.log(error.debugData);
          return;
        });
    }
  }

  toggleFacetRefinement(facet: any = {}) {
    this.indices.applications.toggleFacetRefinement(facet.name, facet.query).search();
  }

  nextPage() {
    if (this.indices.applications.state.query !== '') {
      console.log(this.indices.applications.getIndex());

      this.indices.applications.nextPage().search();
    }
  }

  sortByPriceAsc(query?: string) {
    query = query || this.indices.applications.state.query;
    this.search('applications_by_price_asc', query);
  }
  sortByRatingDesc(query?: string) {
    query = query || this.indices.applications.state.query;
    this.search('applications_by_rating_desc', query);
  }
  sortByRelevance(query?: string) {
    query = query || this.indices.applications.state.query;
    this.search('applications', query);
  }
}
