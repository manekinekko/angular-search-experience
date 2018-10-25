import { NgModule, ModuleWithProviders } from '@angular/core';
import { DIALOGFLOW_TOKEN } from './inject-tokens';
import { NlpService } from './nlp.service';

export interface DialogflowTokenInterface {
  accessToken: string;
}

@NgModule({
  providers: [NlpService]
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
