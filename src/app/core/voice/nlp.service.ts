import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Injectable, Inject } from '@angular/core';
import { DIALOGFLOW_TOKEN } from './inject-tokens';

@Injectable({
  providedIn: 'root'
})
export class NlpService {
  client: ApiAiClient;

  constructor(@Inject(DIALOGFLOW_TOKEN) private accessToken) {
    this.client = new ApiAiClient({ accessToken });
  }

  async process(message: string) {
    try {
      const response = (await this.client.textRequest(message)) as any;
      const url = response.result.contexts && response.result.contexts[0] && response.result.contexts[0].parameters.url;
      const speech = response.result.fulfillment.speech;
      return {
        speech: speech.replace(/<<(.*)>>/gi, ''),
        link: (speech.match(/<<(.*)>>/) || [null, null])[1]
      };
    } catch (error) {
      console.error(error);
    }
  }
}
