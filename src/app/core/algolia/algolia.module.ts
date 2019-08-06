import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgoliaService } from './algolia.service';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_SEARCH_API_KEY, ALGOLIA_INDEX } from './injection-tokens';

export interface AlgoliaConfiguration {
  applicationId: string;
  searchApiKey: string;
  indexName: string;
}

@NgModule({
  providers: [AlgoliaService]
})
export class AlgoliaModule {
  static forRoot(config: AlgoliaConfiguration): ModuleWithProviders {
    return {
      ngModule: AlgoliaModule,
      providers: [
        {
          provide: ALGOLIA_APPLICATION_ID,
          useValue: config.applicationId
        },
        {
          provide: ALGOLIA_SEARCH_API_KEY,
          useValue: config.searchApiKey
        },
        {
          provide: ALGOLIA_INDEX,
          useValue: config.indexName
        }
      ]
    };
  }
}
