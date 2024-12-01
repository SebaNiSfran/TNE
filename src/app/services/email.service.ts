

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importamos HttpClient y HttpHeaders
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailJsApiUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // URL de la API
  private userId = 'dVlYA6QXDdfqFjyWk'; // ID de usuario de Email.js
  private serviceId = 'service_sexopmp'; // ID de servicio de Email.js
  private templateId = 'template_pf4hxeb'; //  ID de plantilla

  constructor(private http: HttpClient) {}

  // Método para enviar el correo de recuperación
  sendRecoveryEmail(email: string): Observable<any> {
    // Generamos un enlace de recuperación único (
    const recoveryLink = `https://www.tuapp.com/recover-password?token=someUniqueToken`; 

    // Parámetros para la plantilla
    const templateParams = {
      to_email: email, // El correo al que se enviará el enlace de recuperación
      subject: 'Recuperación de Contraseña', // Asunto del correo
      message: `Haga clic en el siguiente enlace para recuperar su contraseña: <a href="${recoveryLink}">Recuperar contraseña</a>`, 
    };

    const body = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.userId,
      template_params: templateParams,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Configuracion 
    });

    // Cambiando tipo de texto 
    return this.http.post(this.emailJsApiUrl, body, { headers, responseType: 'text' });
  }
}
