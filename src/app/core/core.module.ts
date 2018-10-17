import { EastereggService } from './easteregg.service';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../core/material/material.module';
import { AlgoliaModule } from '../core/algolia/algolia.module';
import { TextToSpeechService } from './voice/text-to-speech.service';
import { SpeechToTextService } from './voice/speech-to-text.service';
import { NlpModule } from './voice/voice.module';
import { WINDOW_PROVIDERS } from './window-ref.service';

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
  providers: [WINDOW_PROVIDERS, SpeechToTextService, TextToSpeechService, EastereggService],
  exports: [MaterialModule, AlgoliaModule]
})
export class CoreModule {}
