import { FormGroup } from '@angular/forms';
import { QueryParams } from './deeplink.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlgoliaService } from '@app/core/algolia/algolia.service';

export interface QueryParams {
  q: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeeplinkService {
  constructor(private router: Router, private route: ActivatedRoute, private search: AlgoliaService) {}

  registerFormGroup(form: FormGroup) {
    this.route.queryParams.subscribe((query: QueryParams) => {
      if (query.q) {
        form.setValue({
          query: query.q
        });
      }
    });
  }

  syncUrl(queryParams: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams
    });
  }
}
