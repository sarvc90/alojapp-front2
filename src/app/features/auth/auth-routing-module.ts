import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AuthGuard } from '../../core/guards/auth.guards';
import { ProfileComponent } from '../profile/pages/profile';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión' },
  { path: 'register', component: RegisterComponent, title: 'Crear cuenta' },
  { path: 'perfil', canActivate: [AuthGuard], component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
