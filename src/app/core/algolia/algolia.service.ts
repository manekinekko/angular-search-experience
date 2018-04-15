import { Observable, Subject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import algoliasearchHelper from 'algoliasearch-helper';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX } from './injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {
  helper;
  searchState$: Observable<any>;
  resultState$: Observable<any>;
  changeState$: Observable<any>;
  errorState$: Observable<any>;

  constructor(
    @Inject(ALGOLIA_APPLICATION_ID) private applicationID,
    @Inject(ALGOLIA_SEARCH_API_KEY) private searchApiKey,
    @Inject(ALGOLIA_INDEX) private indexName
  ) {
    const client = window['algoliasearch'](applicationID, searchApiKey);
    this.helper = algoliasearchHelper(client, indexName);

    // handle search events
    this.searchState$ = new Observable(observer => {
      this.helper.on('search', e => observer.next(e));
      return () => {};
    });

    // handle result events
    this.resultState$ = new Observable(observer => {
      this.helper.on('result', e => observer.next(e));
      return () => {};
    });

    // handle change events
    this.changeState$ = new Observable(observer => {
      this.helper.on('change', e => observer.next(e));
      return () => {};
    });

    // handle error events
    this.errorState$ = new Observable(observer => {
      this.helper.on('error', e => observer.next(e));
      return () => {};
    });
  }

  configure(options) {
    this.helper.setQueryParameter(options);
  }

  search(query: string) {
    if (query) {
      this.helper.setQuery(query).search();
    }
  }

  nextPage() {
    if (this.helper.state.query !== '') {
      this.helper.nextPage().search();
    }
  }
}
