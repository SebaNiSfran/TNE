import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EmailService } from '../../services/email.service';
import { catchError, finalize } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  email: string = '';
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private emailService: EmailService
  ) {}

  ngOnInit() {}

  async onSubmit() {
    // Validación de email
    if (!this.email || !this.validateEmail(this.email)) {
      this.showToast('Por favor, ingresa un correo electrónico válido', 'danger');
      return;
    }

    // Prevenir múltiples envíos
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.emailService.sendRecoveryEmail(this.email)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(() => error);
        }),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response: string) => {
          console.log('Correo de recuperación enviado con éxito', response);
          this.email = '';
          this.showToast('Enlace de recuperación enviado con éxito', 'success');
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error al enviar el correo de recuperación', error);
    
    let errorMessage = 'Hubo un error al enviar el enlace de recuperación';
    
    if (error.status === 422) {
      errorMessage = 'No se pudo enviar el correo. Verifique la dirección de correo electrónico';
    } else if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    }

    this.showToast(errorMessage, 'danger');
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  onBack() {
    this.router.navigate(['/login']);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}