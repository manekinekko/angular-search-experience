import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/core/material/material.module';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [CategoryComponent],
  exports: [CategoryComponent]
})
export class FacetsModule {}
