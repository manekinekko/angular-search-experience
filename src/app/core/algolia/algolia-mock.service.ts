import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import algoliasearchHelper from 'algoliasearch-helper';
import { IAlgoliaService, SearchState } from './algolia.interface';

/**
 * The Algolia search strategy. This implementtion uses three indices based on the sort options:
 * - `applications_by_price_asc`: used for retreiving entries sorted by price (in ascending order), ie. Free apps first.
 * - `applications_by_rating_desc`: used for retreiving entries sorted by rating (in descending order), ie. Popular apps first.
 * - `applications` (default): used for retreiving entries sorted by the default Algolia ranking algorithm, ie. Relevance.
 */
@Injectable()
export class AlgoliaMockService implements IAlgoliaService {

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

  constructor() {
    this.searchState = {} as any;
    this.configureMasterIndex('applications');
  }

  /**
   * Configures the default Algolia index (master).
   * This will initialise all the search states `search$`, `result$`, `change$`, `error$`.
   * @param indexName The index name.
   */
  private configureMasterIndex(indexName: string) {
    // map algolia's events to observables
    ['search', 'result', 'change', 'error'].forEach(eventName => {
      this.searchState[`${eventName}$`] = new Subject();
    });
  }

  /**
   * Set an initial search parameters to be used by the search method.
   * @param options
   */
  setQueryParameter(options) {}

  /**
   * Run the actual search process.
   * @param indexName The index name to be used.
   * @param query The user query used for search.
   */
  private search(indexName: string, query: string) {
  }

  /**
   * Enable or disable the Facet refinement when search against the master index.
   * @param facet The facet name and query
   */
  toggleFacetRefinement(facet: { name: string; query: string } = {} as any) {}

  /**
   * Search the next page (used for the inifinite scroll feature)
   */
  nextPage() {}

  sortByPriceAsc(query?: string) {}
  sortByRatingDesc(query?: string) {}
  sortByRelevance(query?: string) {}
}
