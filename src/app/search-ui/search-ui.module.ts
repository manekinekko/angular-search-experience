import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchService } from './search.service';
import { SearchComponent } from './search/search.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CoreModule } from '@app/core/core.module';
import { SearchUiRoutingModule } from '@app/search-ui/search-ui-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SearchUiRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [SearchComponent, SearchInputComponent, SearchResultComponent],
  providers: [SearchService]
})
export class SearchUiModule { }
