import { EastereggService } from './easteregg.service';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/core/material/material.module';
import { AlgoliaModule } from '@app/core/algolia/algolia.module';
import { TextToSpeechService } from '@app/core/nlp/text-to-speech.service';
import { SpeechToTextService } from '@app/core/nlp/speech-to-text.service';
import { NlpModule } from '@app/core/nlp/nlp.module';

@NgModule({
  imports: [
    MaterialModule,
    AlgoliaModule.forRoot({
      applicationId: environment.algolia.applicationId,
      searchApiKey: environment.algolia.searchApiKey,
      indexName: environment.algolia.indexName
    }),
    NlpModule.forRoot({
      accessToken: environment.dialogflow.accessToken
    })
  ],
  providers: [SpeechToTextService, TextToSpeechService, EastereggService],
  exports: [MaterialModule, AlgoliaModule]
})
export class CoreModule {}
