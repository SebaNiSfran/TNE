import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Para SQLite
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http'; //  forma para HttpClient
import { EmailService } from './services/email.service'; // Importamos el EmailService

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite, // Declarando SQLite
    provideHttpClient(), // Configurar HttpClient usando la nueva API
    EmailService, // Declaramos EmailService solo si no se usa providedIn: 'root'
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
