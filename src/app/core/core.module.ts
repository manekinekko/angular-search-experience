import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/core/material/material.module';
import { AlgoliaModule } from '@app/core/algolia/algolia.module';

@NgModule({
  imports: [
    MaterialModule,
    AlgoliaModule.forRoot({
      applicationId: environment.algolia.applicationId,
      searchApiKey: environment.algolia.searchApiKey,
      indexName: environment.algolia.indexName
    })
  ],
  exports: [MaterialModule, AlgoliaModule]
})
export class CoreModule {}
