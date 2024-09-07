import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-creacioncuenta',
  templateUrl: './creacioncuenta.page.html',
  styleUrls: ['./creacioncuenta.page.scss'],
})
export class CreacioncuentaPage implements OnInit {
  rut: string = '';
  fullName: string = '';
  educationLevel: string = '';
  birthDate: string | null = null;
  email: string = '';
  emailValid: boolean = true;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  validateEmail() {
    this.emailValid = this.email.endsWith('@example.com');
  }

  isFormValid(): boolean {
    return !!(this.rut && this.fullName && this.educationLevel && this.birthDate && this.emailValid);
  }

  async onSubmit() {
    if (this.isFormValid()) {
      console.log('Datos enviados:', {
        rut: this.rut,
        fullName: this.fullName,
        educationLevel: this.educationLevel,
        birthDate: this.birthDate,
        email: this.email
      });

      // Mostrar un toast de éxito
      const toast = await this.toastController.create({
        message: 'Creación exitosa',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      // Redirigir al login
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario incompleto o correo inválido');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}



