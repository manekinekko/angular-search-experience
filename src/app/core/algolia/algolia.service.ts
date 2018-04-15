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
      const handler = e => observer.next(e);
      this.helper.on('search', handler);
      return () => {
        this.helper.removeListener('search', handler);
      };
    });

    // handle result events
    this.resultState$ = new Observable(observer => {
      const handler = e => observer.next(e);
      this.helper.on('result', handler);
      return () => {
        this.helper.removeListener('result', handler);
      };
    });

    // handle change events
    this.changeState$ = new Observable(observer => {
      const handler = e => observer.next(e);
      this.helper.on('change', handler);
      return () => {
        this.helper.removeListener('change', handler);
      };
    });

    // handle error events
    this.errorState$ = new Observable(observer => {
      const handler = e => observer.next(e);
      this.helper.on('error', handler);
      return () => {
        this.helper.removeListener('error', handler);
      };
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
