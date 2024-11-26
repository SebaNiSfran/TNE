import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortalPagoPageRoutingModule } from './portal-pago-routing.module';

import { PortalPagoPage } from './portal-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortalPagoPageRoutingModule
  ],
  declarations: [PortalPagoPage]
})
export class PortalPagoPageModule {}
