import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ALGOLIA_APPLICATION_ID, ALGOLIA_INDEX, ALGOLIA_SEARCH_API_KEY, ALGOLIA_SERVICE } from './injection-tokens';

export interface AlgoliaConfiguration {
  applicationId: string;
  searchApiKey: string;
  indexName: string;
}

@NgModule({
  providers: [
    {
      provide: ALGOLIA_SERVICE,
      useClass: environment.algoliaService
    }
  ]
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
