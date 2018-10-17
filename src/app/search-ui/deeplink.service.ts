import { FormGroup } from '@angular/forms';
import { QueryParams } from './deeplink.service';
import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ALGOLIA_SERVICE } from '../core/algolia/injection-tokens';
import { IAlgoliaService } from '../core/algolia/algolia.interface';

export interface QueryParams {
  q: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeeplinkService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(ALGOLIA_SERVICE) private search: IAlgoliaService) {}

  /**
   * Register a given FormGroup instance with the current "q" queryParams Observbale. Every time the
   * "q" queryParams changes, the "query" FormControl (of the given FormGroup instance) will be updated, reflecting the same value.
   * @param form The given FormGroup to register.
   */
  registerFormGroup(form: FormGroup) {
    this.route.queryParams.subscribe((query: QueryParams) => {
      if (query.q) {
        form.setValue({
          query: query.q
        });
      }
    });
  }

  /**
   * This method is used to update the current URL queryParams.
   * It is used to keep both the URL and the formControl in sync.
   * @param queryParams A given Params object containing the queryParams to set.
   */
  syncUrl(queryParams: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
}
