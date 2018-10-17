import { Injectable } from '@angular/core';
import { INlpService } from './nlp.interface';

@Injectable()
export class NlpMockService implements INlpService {

  process(message: string) {
    const result = new Promise<{speech: string, link: string}>((resolve, reject) => {
      resolve({
        speech: '',
        link: ''
      });
    });
    return result;
  }
}
