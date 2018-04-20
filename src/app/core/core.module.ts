import { EastereggService } from './easteregg.service';
import { environment } from './../../environments/environment';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/core/material/material.module';
import { AlgoliaModule } from '@app/core/algolia/algolia.module';
import { TextToSpeechService } from './voice/text-to-speech.service';
import { SpeechToTextService } from './voice/speech-to-text.service';
import { NlpModule } from './voice/voice.module';

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
