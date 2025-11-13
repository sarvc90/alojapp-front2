import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostDashboardComponent } from './pages/dashboard/dashboard';
import { CreateListingComponent } from './pages/create-listing/create-listing.component';
import { mustBeHostGuard } from './guards/must-be-host-guard';

const routes: Routes = [
{ path: '', component: HostDashboardComponent, /* canActivate: [mustBeHostGuard], */ title: 'Dashboard de Anfitrión' },
{ path: 'alojamientos/nuevo', component: CreateListingComponent, canActivate: [mustBeHostGuard], title: 'Crear alojamiento' }

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostDashboardRoutingModule { }
