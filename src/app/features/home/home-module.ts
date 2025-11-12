import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';          
import { HomeComponent } from './pages/home/home';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],                      
  imports: [
    CommonModule,
    FormsModule,                                       
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {}
