import { Observable } from 'rxjs';

export interface SearchState {
  search$: Observable<any>;
  result$: Observable<any>;
  change$: Observable<any>;
  error$: Observable<any>;
}

export interface IAlgoliaService {
  indices: any;
  client: any;
  searchState: SearchState;

  setQueryParameter(options: any): void;
  toggleFacetRefinement(facet: { name: string; query: string }): void;
  nextPage(): void;
  sortByPriceAsc(query?: string): void;
  sortByRatingDesc(query?: string): void;
  sortByRelevance(query?: string): void;
}
