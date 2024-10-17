import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { E500PageRoutingModule } from './e500-routing.module';

import { E500Page } from './e500.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    E500PageRoutingModule
  ],
  declarations: [E500Page]
})
export class E500PageModule {}
