import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { skip } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      routerLink: '/'
    },
    {
      label: 'Login',
      icon: 'fa-solid fa-sign-in',
      routerLink: '/login'
    },
    {
      label: 'Alta Repartidor',
      icon: 'fa-solid fa-user-plus',
      routerLink: '/alta-repartidor'
    },
    {
      label: 'Repartidor detalle',
      icon: 'fa-solid fa-users',
      routerLink: '/repartidor-detalle'
    },
    {
      label: 'Salen Helados',
      icon: 'fa-solid fa-ice-cream',
      routerLink: '/salen-helados'
    }
  ];
  constructor(public servAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  Desloguear() {
    this.servAuth.LogOut();
    this.router.navigateByUrl('/login');
  }
}