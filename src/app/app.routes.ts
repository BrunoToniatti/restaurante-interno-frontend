import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Reservation } from './pages/reservation/reservation';
import { Menu } from './pages/menu/menu';
import { Management } from './pages/management/management';
import { Comandas } from './pages/comandas/comandas';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'app',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'reservas',
        pathMatch: 'full'
      },
      {
        path: 'reservas',
        component: Reservation
      },
      {
        path: 'cardapio',
        component: Menu
      },
      {
        path: 'gestao',
        component: Management
      },
      {
        path: 'comandas',
        component: Comandas
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
