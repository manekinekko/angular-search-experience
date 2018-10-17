import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import algoliasearchHelper from 'algoliasearch-helper';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX } from './injection-tokens';
import { WINDOW } from '../window-ref.service';
import { IAlgoliaService, SearchState } from './algolia.interface';

/**
 * The Algolia search strategy. This implementtion uses three indices based on the sort options:
 * - `applications_by_price_asc`: used for retreiving entries sorted by price (in ascending order), ie. Free apps first.
 * - `applications_by_rating_desc`: used for retreiving entries sorted by rating (in descending order), ie. Popular apps first.
 * - `applications` (default): used for retreiving entries sorted by the default Algolia ranking algorithm, ie. Relevance.
 */
@Injectable()
export class AlgoliaService implements IAlgoliaService {
  indices = {
    applications: algoliasearchHelper,
    applications_by_rating_desc: algoliasearchHelper,
    applications_by_price_asc: algoliasearchHelper
  };
  client;

  /**
   * A map of the different search states: `search$`, `result$`, `change$`, `error$`.
   */
  searchState: SearchState;

  constructor(
    @Inject(ALGOLIA_APPLICATION_ID) private applicationID,
    @Inject(ALGOLIA_SEARCH_API_KEY) private searchApiKey,
    @Inject(ALGOLIA_INDEX) private indexName,
    @Inject(WINDOW) private window,
  ) {
    this.client = window['algoliasearch'](applicationID, searchApiKey);

    this.searchState = {} as any;

    this.configureMasterIndex('applications');
  }

  /**
   * Configures the default Algolia index (master).
   * This will initialise all the search states `search$`, `result$`, `change$`, `error$`.
   * @param indexName The index name.
   */
  private configureMasterIndex(indexName: string) {
    this.indices[indexName] = algoliasearchHelper(this.client, indexName, {
      disjunctiveFacets: ['category']
    });

    this.searchState = {} as SearchState;

    // map algolia's events to observables
    ['search', 'result', 'change', 'error'].forEach(eventName => {
      this.searchState[`${eventName}$`] = new Observable(observer => {
        const handler = e => observer.next(e);
        this.indices[indexName].on(eventName, handler);
        return () => this.indices[indexName].removeListener(eventName, handler);
      });
    });
  }

  /**
   * Set an initial search parameters to be used by the search method.
   * @param options
   */
  setQueryParameter(options) {
    this.indices.applications.setQueryParameter(options);
  }

  /**
   * Run the actual search process.
   * @param indexName The index name to be used.
   * @param query The user query used for search.
   */
  private search(indexName: string, query: string) {
    if (query.trim() !== '') {
      this.indices.applications
        .setIndex(indexName)
        .setQuery(query)
        .search();
    }
  }

  /**
   * Enable or disable the Facet refinement when search against the master index.
   * @param facet The facet name and query
   */
  toggleFacetRefinement(facet: { name: string; query: string } = {} as any) {
    this.indices.applications.toggleFacetRefinement(facet.name, facet.query).search();
  }

  /**
   * Search the next page (used for the inifinite scroll feature)
   */
  nextPage() {
    // request the next page only if the current query is not empty!
    if (this.indices.applications.state.query !== '') {
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
