import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreacioncuentaPage } from './creacioncuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CreacioncuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreacioncuentaPageRoutingModule {}
