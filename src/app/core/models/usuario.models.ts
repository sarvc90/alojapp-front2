export interface Usuario {
}
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  fechaNacimiento?: string | null; // ISO yyyy-MM-dd
  fotoPerfilUrl?: string | null;
}