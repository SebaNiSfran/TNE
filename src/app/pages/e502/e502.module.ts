import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { E502PageRoutingModule } from './e502-routing.module';

import { E502Page } from './e502.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    E502PageRoutingModule
  ],
  declarations: [E502Page]
})
export class E502PageModule {}
