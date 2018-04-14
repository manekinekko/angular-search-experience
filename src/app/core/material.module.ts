import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatGridListModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

export const MatModules = [
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule
];

@NgModule({
  imports: [CommonModule, ...MatModules],
  exports: [...MatModules],
  declarations: []
})
export class MaterialModule {}
