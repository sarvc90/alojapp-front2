import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlojamientoRoutingModule } from './alojamiento-routing-module';
import { DetalleAlojamientoComponent } from './pages/detalle';

@NgModule({
  declarations: [DetalleAlojamientoComponent],
  imports: [CommonModule, RouterModule, AlojamientoRoutingModule]
})
export class AlojamientoModule {}
