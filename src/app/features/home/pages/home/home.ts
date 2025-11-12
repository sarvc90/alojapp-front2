// src/app/features/home/pages/home/home.ts
import { Component, OnInit } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { AlojamientoService, AlojamientoCard } from '../../../../core/services/alojamiento.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  populares$!: Observable<AlojamientoCard[]>;
  isLoggedIn$!: Observable<boolean>;     // <-- declarar sin inicializar

  constructor(
    private aloj: AlojamientoService,
    private auth: AuthService,
    private router: Router
  ) {}

  destinos = [
    {
      titulo: 'París, Francia',
      desc: 'La ciudad del amor y las luces.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIsh-tA5Jb93mqw2t4Qln7qyRRdMSu5KRlFOLfiC3uLpvZ6Xxn13pzuiwF0JljyORpj6BUn9TgMVD5e8Gn0yVdCTYVsJko1s3IYiXSqaAEvx-mdmS4uBVqlJQ7YnT6_L_hpDnpsjGBzn29_9ZZU4PPoVTByeMZfJK6bHNzo-oCLEgYMXnTYqfBM9Y9dEntEhA0o4y6UFJCHgj01rvjob5T4uUHi4kHIGMy-hOBdfhV3d8g1XGPOkaT3IoeVWM9uU7gozjCaAUpuQ8'
    },
    {
      titulo: 'Kyoto, Japón',
      desc: 'El corazón cultural de Japón.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZtLRRIgr-xkw3nXiXLjxdOxcjU2Y3DqNaClnDJQGT5mlqeYrP3AaVE_Zz98B2kaW9_sph75hEZSKWXcgM2ZzvDUvB3Fzjiw8Pskikbq9DK_OqDiArcM-r47q1WLdb6fJeB7i4ltTfxPWKaFNVf0UTuhKBq6_xsI1ueU-vb-5iF9puCJRcp5goFUyZ-NBXKNGYXE3vjl6qxiiKts8eB__QAW_P0lJiEDw5lIaee_zIo4arZlyP8bgGrrYxTBpOWQkudVxYMy-ybss'
    },
    {
      titulo: 'Roma, Italia',
      desc: 'Historia y pasta en cada esquina.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcTygOZa380tZhKR4olQyMQCsu7UYxo1D-EN68L6Udc_gR6Lk3aQIOj6fV7NwbFLg9vE91O3XOqQoUeNrmBOWYhwS4Ep2k4v2eeQ9R1LEsVg2p3k-KYHahuTfz_lWU9LSel33I29fkhZcu1juqjnZSXFQC0axIFjJB1d5TbTwPOyWtI9ZZT9hFlZeSNp7UE8IGg3hhR9GeC-YC_2u5hLDnVC7Z2wYpNeeGKfMH5KXJVwJJfUnikVt9EpbFnSRcGxT-EfYRkqdDkOI'
    },
    {
      titulo: 'Nueva York, USA',
      desc: 'La ciudad que nunca duerme.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnCNmO5MKPyy0hIjHo9lbQlkuthed9mwlujuhwLGaJawlGF3539YcbO7hxIiXcJWoY0hPwfO_vrpGKZd0-LeqeSroaP8CBWOrxf2tmPWoaWTsM2HcF86apwhc6cEVOnAmQ82_dSCbthuuIjlOAgguAz3ElzYPw7oom-UPN-OaI6R_pogby0ugpQdd_i2eob-HPbTmBzK-P-D9wLLH6ufEUweoStV_kxyqZBas2mT0dnWROGlPE5VMN804_Lba1ae6noCv4PrOoeZ4'
    }
  ];

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.loggedIn$;            
    this.populares$  = this.aloj.getPopulares().pipe(startWith([]));
  }

  foto(a: AlojamientoCard)     { return a.portadaUrl || 'assets/placeholder.jpg'; }
  ubicacion(a: AlojamientoCard){ return [a.ciudad, a.pais].filter(Boolean).join(', '); }
  precio(a: AlojamientoCard)   { return a.precioNoche != null ? `$${a.precioNoche}` : '—'; }
  rating(a: AlojamientoCard)   { return a.rating != null ? Number(a.rating).toFixed(1) : '—'; }

  logout() { this.auth.logout(); }

  q = '';
ciudad = '';
checkin = '';
checkout = '';
huespedes?: number;

onSubmit(ev: Event) {
  ev.preventDefault();  
  this.goSearch();
}

goSearch() {
  this.router.navigate(['/buscar'], {
    queryParams: {
      q: this.q || null,
      ciudad: this.ciudad || null,
      checkin: this.checkin || null,
      checkout: this.checkout || null,
      huespedes: this.huespedes || null
    }
  });

  
}

openDetalle(a: AlojamientoCard) {
  const id = this.getId(a);
  if (!id) { console.warn('Alojamiento sin id'); return; }
  this.router.navigate(['/alojamiento', id]);
}

private getId(a: AlojamientoCard): string | number | null {
  return (a as any).id ?? (a as any).alojamientoId ?? (a as any).codigo ?? (a as any).uuid ?? null;
}


}
