import { NgModule, ModuleWithProviders } from '@angular/core';
import { DIALOGFLOW_TOKEN, NLP_SERVICE } from './inject-tokens';
import { environment } from '../../../environments/environment';

export interface DialogflowTokenInterface {
  accessToken: string;
}

@NgModule({
  providers: [
    {
      provide: NLP_SERVICE,
      useClass: environment.nlpService
    }
  ]
})
export class NlpModule {
  static forRoot(config: DialogflowTokenInterface): ModuleWithProviders {
    return {
      ngModule: NlpModule,
      providers: [
        {
          provide: DIALOGFLOW_TOKEN,
          useValue: config.accessToken
        }
      ]
    };
  }
}
