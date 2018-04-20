import { ApiAiClient, IServerResponse } from 'api-ai-javascript/index.js';
import { Injectable, Inject, InjectionToken } from '@angular/core';
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
      return {
        speech: response.result.fulfillment.speech,
        url
      };
    } catch (error) {
      console.error(error);
    }
  }
}
