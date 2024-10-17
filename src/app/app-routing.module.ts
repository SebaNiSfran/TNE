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
    path: 'recuperar-tne',
    loadChildren: () => import('./recuperar-tne/recuperar-tne.module').then( m => m.RecuperarTnePageModule)
  },
  {
    path: 'revalidar-tne',
    loadChildren: () => import('./revalidar-tne/revalidar-tne.module').then( m => m.RevalidarTnePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
