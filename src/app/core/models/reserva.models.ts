export interface Reserva {
}

export type EstadoReserva = 'PENDIENTE'|'CONFIRMADA'|'CANCELADA'|'COMPLETADA'|'EN_PROCESO'|string;

export interface Reserva {
  id: number;
  estado: EstadoReserva;
  fechaCheckin: string;   // ISO
  fechaCheckout: string;  // ISO
  // datos del alojamiento (según tu DTO; mapeamos defensivamente)
  alojamientoTitulo?: string;
  alojamientoImagen?: string | null;
}
