import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MATERIAL = [
  MatFormFieldModule, MatInputModule, MatButtonModule,
  MatIconModule, MatCardModule, MatProgressSpinnerModule
];

@NgModule({ exports: MATERIAL })
export class MaterialModule {}
