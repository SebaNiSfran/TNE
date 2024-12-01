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

  // Validación de email
  validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    this.emailValid = this.email === '' || emailRegex.test(this.email);
  }

  // Verifica si el formulario es válido
  isFormValid(): boolean {
    return !!(
      this.rut && this.fullName && this.educationLevel &&
      this.birthDate && this.email && this.emailValid &&
      this.password && this.password === this.confirmPassword
    );
  }

  // Lógica para enviar el formulario de registro
  async onSubmit() {
    if (this.isFormValid()) {
      const userData = {
        rut: this.rut,
        fullName: this.fullName,
        educationLevel: this.normalizeEducationLevel(this.educationLevel),
        birthDate: this.birthDate,
        email: this.email,
        password: this.password,
      };

      // Obtener los usuarios existentes desde localStorage
      const existingUsers = JSON.parse(localStorage.getItem('userAccounts') || '[]');

      // Verificar si ya existe un usuario con el mismo email o RUT
      const userExists = existingUsers.some(
        (user: any) => user.email === userData.email || user.rut === userData.rut
      );

      if (userExists) {
        const toast = await this.toastController.create({
          message: 'Ya existe una cuenta con este correo o RUT.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return;
      }

      // Agrega el nuevo usuario al arreglo de usuarios
      existingUsers.push(userData);

      // Guarda la lista actualizada de usuarios en localStorage
      localStorage.setItem('userAccounts', JSON.stringify(existingUsers));

      const toast = await this.toastController.create({
        message: 'Cuenta creada exitosamente',
        duration: 2000,
        color: 'success',
      });
      toast.present();

      // Redirige al login
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

  // Normaliza el nivel educativo
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

  // Redirige a la página de login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}


