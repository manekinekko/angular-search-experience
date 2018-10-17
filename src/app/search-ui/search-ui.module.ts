import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SearchService } from './search.service';
import { SearchComponent } from './search/search.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchUiRoutingModule } from './search-ui-routing.module';
import { RatingDirective } from './search-result/rating.directive';
import { FreePriceLabelPipe } from './search-result/pipes/free-price-label.pipe';
import { InfiniteScrollDirective } from './search/infinite-scroll.directive';
import { FacetsModule } from './facets/facets.module';

@NgModule({
  imports: [CommonModule, CoreModule, SearchUiRoutingModule, FacetsModule, RouterModule, ReactiveFormsModule],
  declarations: [
    SearchComponent,
    SearchInputComponent,
    SearchResultComponent,
    RatingDirective,
    FreePriceLabelPipe,
    InfiniteScrollDirective
  ],
  providers: [SearchService]
})
export class SearchUiModule {}
