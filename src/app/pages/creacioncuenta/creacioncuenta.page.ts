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
  password: string = '';
  confirmPassword: string = '';
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
    return !!(
      this.rut && this.fullName && this.educationLevel &&
      this.birthDate && this.email && this.emailValid &&
      this.password && this.password === this.confirmPassword
    );
  }

  async onSubmit() {
    if (this.isFormValid()) {
      const userData = {
        rut: this.rut,
        fullName: this.fullName,
        educationLevel: this.normalizeEducationLevel(this.educationLevel),
        birthDate: this.birthDate,
        email: this.email,
        password: this.password
      };

      localStorage.setItem('userAccount', JSON.stringify(userData));

      console.log('Datos guardados:', JSON.parse(localStorage.getItem('userAccount') || '{}'));

      const toast = await this.toastController.create({
        message: 'Cuenta creada exitosamente',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      this.router.navigate(['/login']);
    } else {
      let errorMessage = 'Por favor, complete todos los campos correctamente.';
      
      if (!this.rut) errorMessage = 'Por favor, ingrese su RUT.';
      else if (!this.fullName) errorMessage = 'Por favor, ingrese su nombre completo.';
      else if (!this.educationLevel) errorMessage = 'Por favor, seleccione su nivel educativo.';
      else if (!this.birthDate) errorMessage = 'Por favor, ingrese su fecha de nacimiento.';
      else if (!this.email || !this.emailValid) errorMessage = 'Por favor, ingrese un correo electrónico válido.';
      else if (!this.password) errorMessage = 'Por favor, ingrese una contraseña.';
      else if (this.password !== this.confirmPassword) errorMessage = 'Las contraseñas no coinciden.';

      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  normalizeEducationLevel(level: string): string {
    const normalized = level.toLowerCase().trim();
    switch (normalized) {
      case 'basico':
      case 'basica':
        return 'basica';
      case 'medio':
      case 'media':
        return 'media';
      case 'superior':
        return 'superior';
      default:
        return normalized;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}






