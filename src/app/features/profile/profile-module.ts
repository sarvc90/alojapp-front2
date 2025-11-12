import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile';
import { AuthGuard } from '../../core/guards/auth.guards';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)   
  ]
})
export class ProfileModule {}
