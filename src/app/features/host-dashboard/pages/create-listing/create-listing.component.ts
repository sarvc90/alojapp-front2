// src/app/features/host-dashboard/pages/create-listing/create-listing.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiciosService, ServicioDTO } from '../../../../core/services/servicios';
import { HostDashboardService } from '../../../../core/services/host-dashboard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
  standalone:false
})
export class CreateListingComponent implements OnInit {
  form!: FormGroup; 
  servicios$!: Observable<ServicioDTO[]>;
  files: File[] = [];
  publicando = false;
  error?: string;



  constructor(
    private fb: FormBuilder,
    private srvServicios: ServiciosService,
    private hostSrv: HostDashboardService
  ) {}

  ngOnInit(): void {
    this.servicios$ = this.srvServicios.getAll$(); 
    this.form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(6)]],
    descripcion: ['', [Validators.required, Validators.minLength(30)]],
    ciudad: ['', Validators.required],
    direccion: ['', Validators.required],
    latitud: [null as number | null, Validators.required],
    longitud: [null as number | null, Validators.required],
    precioNoche: [null as number | null, [Validators.required, Validators.min(1)]],
    capacidadMaxima: [1, [Validators.required, Validators.min(1)]],
    serviciosIds: [[] as number[]]  
  });
  }

  onFilesSelected(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (input.files?.length) {
      this.files = Array.from(input.files);
    }
  }

  // publicar
  submit(): void {
  this.error = undefined;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const files: File[] = this.files ?? [];

  const v = this.form.value;
  const payload = {
    titulo: String(v.titulo || '').trim(),
    descripcion: String(v.descripcion || '').trim(),
    ciudad: String(v.ciudad || '').trim(),
    direccion: String(v.direccion || '').trim(),
    latitud: v.latitud ?? null,
    longitud: v.longitud ?? null,
    precioNoche: Number(v.precioNoche ?? 0),
    capacidadMaxima: Number(v.capacidadMaxima ?? 1),
    serviciosIds: Array.isArray(v.serviciosIds) ? v.serviciosIds : []
  };

  // Validación mínima adicional (opcional)
  if (!payload.titulo || !payload.descripcion || !payload.ciudad || !payload.direccion) {
    this.error = 'Completa los campos obligatorios.';
    return;
  }

  this.publicando = true;

  this.hostSrv.getAnfitrionId().subscribe({
    next: (anfitrionId) => {
      if (!anfitrionId) {
        this.publicando = false;
        this.error = 'No se pudo resolver el anfitrión actual.';
        return;
      }

      this.hostSrv.crearAlojamiento(anfitrionId, payload, files).subscribe({
        next: (res) => {
          this.publicando = false;

          // Éxito: limpia y navega (ajusta ruta)
          this.form.reset();
          this.files = [];
        },
        error: (e) => {
          this.publicando = false;

          // Intenta leer mensaje de backend
          const msg =
            e?.error?.message ||
            e?.error?.detalle ||
            e?.error?.error ||
            'No se pudo crear el alojamiento.';
          this.error = msg;
        }
      });
    },
    error: () => {
      this.publicando = false;
      this.error = 'No se pudo obtener el usuario.';
    }
  });
}

}
