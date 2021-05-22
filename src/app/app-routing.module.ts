import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LoginGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((module) => module.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((module) => module.HomeModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'three',
    loadChildren: () =>
      import('./features/three-dashboard/three-dashboard.module').then(
        (module) => module.ThreeDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.module').then(
        (module) => module.ContactModule
      )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
