import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Usuario } from '../models/usuario.models';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;  // ej: http://localhost:8080/api

  me(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.base}/usuarios/me`);
  }
}
