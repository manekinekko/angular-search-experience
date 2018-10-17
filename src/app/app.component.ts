import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { EastereggService } from './core/easteregg.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hits = 0;
  constructor(
    private easter: EastereggService,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  hitMe() {
    if (isPlatformBrowser(this.platformId)) {
      this.hits++;
      if (this.hits > 5) {
        this.hits = 0;
        this.easter.surprise();
      } else {
        console.log('One more time...');
      }
    }
  }
}
