import { debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';
import { NlpService } from './voice/nlp.service';
import { Injectable, NgZone } from '@angular/core';
import { SpeechToTextService } from './voice/speech-to-text.service';
import { TextToSpeechService } from './voice/text-to-speech.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class EastereggService {
  isActivated = false;
  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private stt: SpeechToTextService,
    private tts: TextToSpeechService,
    private nlp: NlpService
  ) {}

  async surprise() {
    if (this.isActivated) {
      return true;
    }
    this.isActivated = true;
    console.log('Activating speach recognition...');
    this.stt.listen();
    this.setup();
    const response = await this.nlp.process('request welcome');
    this.tts.say(response.speech);
  }

  private setup() {
    let sb = null;
    let lastAppLink = null;
    this.stt.onstart$.subscribe(() => {
      this.zone.run(() => {
        sb = this.snackBar.open('Listening...', 'STOP');
        sb.onAction().subscribe(() => {
          this.stt.stop();
          sb.dismiss();
        });
      });
    });
    this.stt.onresult$
      .pipe(
        // prettier-ignore
        debounceTime(200),
        distinctUntilChanged(),
        filter(transcription => !!transcription),
        // tap(_ => this.tts.say(['Let me check', 'Searching', 'Here we go'])),
        switchMap(transcription => from(this.nlp.process(transcription)))
      )
      .subscribe(response => {
        this.stt.stop();

        if (response.speech === 'OPEN_LINK_OK') {
          this.tts.say('Alright, opening the application page');
          window.open(lastAppLink, '__blank');
        } else if (response.speech === 'OPEN_LINK_NOK') {
          this.tts.say('Okay. Let me know if you need more help.');
          lastAppLink = null;
        } else {
          this.tts.say(response.speech);
          lastAppLink = response.link;
        }
      });
    this.stt.onend$.subscribe(() => {
      this.isActivated = false;
      this.zone.run(() => {
        sb.dismiss();
      });
    });
    this.stt.onerror$.subscribe(error => {
      this.isActivated = false;
      console.error('STT error', error);
      this.zone.run(() => {
        sb.dismiss();
      });
    });
    this.tts.onend$.subscribe(() => {
      this.isActivated = false;
      this.stt.start();
    });
  }
}
