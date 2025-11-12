// detalle.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlojamientoService, AlojamientoDetalle } from '../../../core/services/alojamiento.service';

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle.html',
  standalone:false
})
export class DetalleAlojamientoComponent implements OnInit {
  detalle$!: Observable<AlojamientoDetalle>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aloj: AlojamientoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.router.navigate(['/home']); return; }
    this.detalle$ = this.aloj.getDetalle(id);
  }

  back(){ this.router.navigate(['/home']); }
}
