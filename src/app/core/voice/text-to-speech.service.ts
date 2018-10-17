import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {
  onend$: Observable<{}>;
  _observer: Observer<{}>;
  constructor() {
    this.onend$ = new Observable(observer => {
      this._observer = observer;
      return () => {};
    });
  }

  say(text: string | string[]) {
    const msg = new SpeechSynthesisUtterance();

    // In case we want to tweak the default voice:
    // const voices = this.window.speechSynthesis.getVoices();
    // msg.voice = voices[49]; // Note: some voices don't support altering params
    // msg['voiceURI'] = 'native';
    // msg.volume = 1; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // msg.pitch = 0; // 0 to 2

    if (text instanceof Array) {
      // tslint:disable-next-line:no-bitwise
      msg.text = text[(Math.random() * text.length) | 0];
    } else {
      msg.text = text;
    }
    msg.lang = 'en-US';

    msg.onend = event => {
      this._observer.next(event);
    };
    speechSynthesis.speak(msg);
  }
}
