// src/app/core/services/reservas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, map } from 'rxjs';
import { Reserva } from '../models/reserva.models';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private base = environment.apiUrl;
  constructor(private http: HttpClient) {}

  listarMias(): Observable<Reserva[]> {
    return this.http.get<any[]>(`${this.base}/reservas`).pipe(
      map(arr => (arr || []).map(this.mapReserva))
    );
  }

  private mapReserva = (r: any): Reserva => ({
    id: r.id ?? r.reservaId ?? 0,
    estado: r.estado ?? 'PENDIENTE',
    fechaCheckin: r.fechaCheckin ?? r.checkin ?? r.fechaInicio ?? '',
    fechaCheckout: r.fechaCheckout ?? r.checkout ?? r.fechaFin ?? '',
    alojamientoTitulo: r.alojamiento?.titulo ?? r.alojamientoTitulo ?? r.alojamientoNombre ?? 'Alojamiento',
    alojamientoImagen:
      r.alojamiento?.portadaUrl ??
      r.portadaUrl ??
      r.alojamiento?.imagenes?.[0]?.url ??
      null
  });
}
