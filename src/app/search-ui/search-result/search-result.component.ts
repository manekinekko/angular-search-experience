import { Application } from './../search.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() entries: Application[];

  constructor() {}

  ngOnInit() {}

  /**
   * Use the entry (appliation) name as a unique key for the trackBy function.
   * @param entry The current entry to use as a filter.
   */
  entryName(entry: Application) {
    return entry && entry.name;
  }
}
