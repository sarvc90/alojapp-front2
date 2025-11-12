export interface Auth {
}
export interface RegistroUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  telefono?: string | null;
  fechaNacimiento: string;      // 'YYYY-MM-DD'
  fotoPerfilUrl?: string | null;
}

export interface UsuarioDTO {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  fechaNacimiento: string;
  fotoPerfilUrl?: string | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string | null;
  fechaNacimiento?: string | null; // ISO yyyy-MM-dd
  fotoPerfilUrl?: string | null;
}