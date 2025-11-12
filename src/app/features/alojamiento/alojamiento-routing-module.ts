import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleAlojamientoComponent } from './pages/detalle';

const routes: Routes = [
  { path: ':id', component: DetalleAlojamientoComponent, title: 'Detalles de Alojamiento' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlojamientoRoutingModule {}
