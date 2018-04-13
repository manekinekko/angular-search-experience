import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatToolbarModule, MatInputModule } from '@angular/material';


export const MatModules = [
  MatGridListModule,
  MatToolbarModule,
  MatInputModule
];

@NgModule({
  imports: [CommonModule, ...MatModules],
  exports: [...MatModules],
  declarations: []
})
export class MaterialModule {}
