import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  AlojamientoService,
  // Si tu service exporta su DTO, lo reutilizamos para evitar choques
  AlojamientoDetalle as AlojamientoDTO
} from '../../../core/services/alojamiento.service';

// ---- ViewModel que usa la vista (todo opcional para no chocar con el DTO real) ----
type ComentarioVM = {
  id: number;
  autor: string;
  avatarUrl?: string;
  calificacion: number;     // 0..5
  texto: string;
  fecha: string | Date;
};

type HostVM = {
  id: number;
  nombre: string;
  avatarUrl?: string;
};

type AlojamientoVM = AlojamientoDTO & {
  host?: HostVM;
  servicios?: { id: number; nombre: string }[];
  comentarios?: ComentarioVM[];
};

@Component({
  selector: 'app-detalle-alojamiento',
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.scss'],
  standalone:false
})
export class DetalleAlojamientoComponent implements OnInit {
  readonly Math = Math;                 // para usar en el HTML
  private readonly route = inject(ActivatedRoute);

  constructor(
    private alojSrv: AlojamientoService,
    private router: Router,
    private location: Location
  ) {}

  cargando = true;
  error?: string;
  aloj: AlojamientoVM | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('id'));
      if (!id) { this.error = 'Id inválido'; return; }

      this.cargando = true;
      this.alojSrv.getDetalle(id).subscribe({
        next: (dto) => {
          // ------- Mapeo suave a ViewModel (tolera nombres distintos del backend) -------
          const anyDto: any = dto as any;

          const vm: AlojamientoVM = {
            ...dto,
            host: anyDto.host ?? anyDto.anfitrion ?? (
              (anyDto.hostId || anyDto.anfitrionId) ? {
                id: anyDto.hostId ?? anyDto.anfitrionId,
                nombre: anyDto.hostNombre ?? anyDto.anfitrionNombre ?? 'Anfitrión',
                avatarUrl: anyDto.hostAvatarUrl ?? anyDto.anfitrionAvatarUrl
              } : undefined
            ),
            servicios: anyDto.servicios ?? anyDto.caracteristicas ?? [],
            comentarios: anyDto.comentarios ?? anyDto.reseñas ?? []
          };

          this.aloj = vm;
          this.cargando = false;
        },
        error: () => {
          this.error = 'No se pudo cargar el alojamiento.';
          this.cargando = false;
        }
      });
    });
  }

  back(): void {
    // Vuelve a la página anterior; si no hay historial, te llevo al home
    if (window.history.length > 1) this.location.back();
    else this.router.navigateByUrl('/home');
  }

  trackById = (_: number, it: { id: number }) => it.id;
}
