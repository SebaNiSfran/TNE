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
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.emailValid = this.email === '' || emailRegex.test(this.email);
  }

  isFormValid(): boolean {
    return !!(this.rut && this.fullName && this.educationLevel && this.birthDate && this.email && this.emailValid);
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

      const toast = await this.toastController.create({
        message: 'Creación exitosa',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      this.rut = '';
      this.fullName = '';
      this.educationLevel = '';
      this.birthDate = null;
      this.email = '';
      this.emailValid = true;

      this.router.navigate(['/login']);
    } else {
      console.log('Formulario incompleto o correo inválido');
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}





