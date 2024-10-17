import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'recover-password',
    redirectTo: 'recover-password',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'creacioncuenta',
    redirectTo: 'creacioncuenta',
    pathMatch: 'full'
  },
  {
    path: 'creacioncuenta',
    redirectTo: 'creacioncuenta',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'e500',
    redirectTo: 'e500',
    pathMatch: 'full'
  },
  {
    path: 'e502',
    redirectTo: 'e502',
    pathMatch: 'full'
  },
  {
    path: 'recuperar-tne',
    redirectTo: 'recuperar-tne',
    pathMatch: 'full'
  },
  {
    path: 'revalidar-tne',
    redirectTo: 'revalidar-tne',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/recover-password/recover-password.module').then( m => m.RecoverPasswordPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'creacioncuenta',
    loadChildren: () => import('./pages/creacioncuenta/creacioncuenta.module').then( m => m.CreacioncuentaPageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'e500',
    loadChildren: () => import('./pages/e500/e500.module').then( m => m.E500PageModule)
  },
  {
    path: 'e502',
    loadChildren: () => import('./pages/e502/e502.module').then( m => m.E502PageModule)
  },
  {
    path: 'recuperar-tne',
    loadChildren: () => import('./pages/recuperar-tne/recuperar-tne.module').then( m => m.RecuperarTnePageModule)
  },
  {
    path: 'revalidar-tne',
    loadChildren: () => import('./pages/revalidar-tne/revalidar-tne.module').then( m => m.RevalidarTnePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
