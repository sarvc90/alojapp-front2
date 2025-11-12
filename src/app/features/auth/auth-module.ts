import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing-module';
import { MaterialModule } from '../../material/material-module';
import { AtomsModule } from '../../ui/atoms/atoms-module';

import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, AtomsModule, AuthRoutingModule]
})
export class AuthModule {}
