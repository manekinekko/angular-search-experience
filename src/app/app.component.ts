import { Component } from '@angular/core';
import { EastereggService } from '@app/core/easteregg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hits = 0;
  constructor(private easter: EastereggService) {}

  hitMe() {
    this.hits++;
    if (this.hits > 5) {
      this.hits = 0;
      this.easter.surprise();
    } else {
      console.log('One more time...');
    }
  }
}
