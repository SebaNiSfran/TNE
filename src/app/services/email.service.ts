// services/email.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importamos HttpClient y HttpHeaders
import { Observable } from 'rxjs'; // Para manejar observables

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private emailJsApiUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // URL de la API
  private userId = 'dVlYA6QXDdfqFjyWk'; // Tu ID de usuario de Email.js
  private serviceId = 'service_sexopmp'; // Tu ID de servicio de Email.js
  private templateId = 'template_pf4hxeb'; // Tu ID de plantilla

  constructor(private http: HttpClient) {}

  // Método para enviar el correo de recuperación
  sendRecoveryEmail(email: string): Observable<any> {
    // Generamos un enlace de recuperación único (este enlace depende de tu backend para generar un token único)
    const recoveryLink = `https://www.tuapp.com/recover-password?token=someUniqueToken`; // Asegúrate de generar un token real

    // Parámetros para la plantilla
    const templateParams = {
      to_email: email, // El correo al que se enviará el enlace de recuperación
      subject: 'Recuperación de Contraseña', // Asunto del correo
      message: `Haga clic en el siguiente enlace para recuperar su contraseña: <a href="${recoveryLink}">Recuperar contraseña</a>`, // Incluir el enlace en el mensaje
    };

    const body = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.userId,
      template_params: templateParams,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Configurar el tipo de contenido
    });

    // Cambiar 'responseType' a 'text' para recibir solo el texto plano
    return this.http.post(this.emailJsApiUrl, body, { headers, responseType: 'text' });
  }
}
