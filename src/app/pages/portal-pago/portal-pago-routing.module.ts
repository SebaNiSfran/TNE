import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalPagoPage } from './portal-pago.page';

const routes: Routes = [
  {
    path: '',
    component: PortalPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalPagoPageRoutingModule {}
