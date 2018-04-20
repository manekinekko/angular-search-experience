import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
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
  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
    private stt: SpeechToTextService,
    private tts: TextToSpeechService,
    private nlp: NlpService
  ) {}

  async surprise() {
    console.log('Activating speach recognition...');
    this.stt.listen();
    this.setup();
    const response = await this.nlp.process('request welcome');
    this.tts.say(response.speech);
  }

  private setup() {
    let sb = null;
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
        switchMap(transcription => from(this.nlp.process(transcription)))
      )
      .subscribe(response => {
        this.stt.stop();
        this.tts.say(response.speech);
      });
    this.stt.onend$.subscribe(() => {
      this.zone.run(() => {
        sb.dismiss();
      });
    });
    this.stt.onerror$.subscribe(error => {
      console.error('STT error', error);
      this.zone.run(() => {
        sb.dismiss();
      });
    });
    this.tts.onend$.subscribe(() => {
      this.stt.start();
    });
  }
}
