import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';

import { AdButtonComponent } from './ad-button/ad-button';
import { AdInputComponent } from './ad-input/ad-input';
import { LogoComponent } from './logo/logo';

@NgModule({
  declarations: [AdButtonComponent, AdInputComponent, LogoComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [AdButtonComponent, AdInputComponent, LogoComponent]
})
export class AtomsModule {}
