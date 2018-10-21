import { Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NlpService } from './nlp.service';

interface Window {
  webkitSpeechRecognition?: typeof SpeechRecognition;
}
declare var window:Window;

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  recognizing = false;
  recognition;
  start_timestamp = 0;
  onresult$: Observable<string>;
  onend$: Observable<{}>;
  onerror$: Observable<{}>;
  onstart$: Observable<{}>;
  constructor() {}

  listen(forceStart = false) {
    if (!window.webkitSpeechRecognition) {
      console.error('Your device is not compatible with this easter egg. sorry!');
    } else {
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.setupListeners();
    }

    if (forceStart) {
      if (this.recognizing) {
        this.recognition.stop();
        return;
      }
      this.recognition.lang = 'en-US';
      this.recognition.start();
      this.start_timestamp = Date.now();
    }
  }

  private setupListeners() {
    this.onstart$ = new Observable(observer => {
      this.recognition.onstart = () => {
        this.handleOnStart();
        observer.next(event);
      };
      return () => (this.recognition.onstart = null);
    });

    this.onerror$ = new Observable(observer => {
      this.recognition.onerror = event => {
        this.handleOnError(event);
        observer.next(event.error);
      };
      return () => (this.recognition.onerror = null);
    });

    this.onend$ = new Observable(observer => {
      this.recognition.onend = event => {
        this.handleOnEnd(event);
        observer.next(event);
      };
      return () => (this.recognition.onend = null);
    });

    this.onresult$ = new Observable(observer => {
      this.recognition.onresult = event => {
        const transcript = this.handleOnResult(event);
        observer.next(transcript);
      };
      return () => (this.recognition.onresult = null);
    });
  }

  stop() {
    this.recognition.stop();
  }
  start() {
    if (this.recognizing) {
      this.recognition.stop();
      return;
    }
    this.recognition.start();
  }

  private handleOnStart() {
    this.recognizing = true;
  }
  private handleOnResult(event) {
    let interim_transcript = '';
    let final_transcript = '';
    if (typeof event.results === 'undefined') {
      this.recognition.onend = null;
      this.recognition.stop();
      console.error(`Sorry, your device is not compatible with Speech-To-Text technology.`);

      return;
    }
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    return final_transcript;
  }

  private handleOnEnd(event) {
    this.recognizing = false;
  }

  private handleOnError(event) {
    if (event.error === 'no-speech') {
      console.log('info_no_speech');
      console.error(`Sorry, I didn't hear anything. Stopping.`);
    }
    if (event.error === 'audio-capture') {
      console.error(`Sorry, your mic isn't available.`);
    }
    if (event.error === 'not-allowed') {
      if (event.timeStamp - this.start_timestamp < 100) {
        console.error(`Sorry, I was blocked from access your mic.`);
      } else {
        console.error(`Sorry, I couln't access your mic.`);
      }
    }
  }
}
