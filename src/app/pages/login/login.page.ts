import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  rut: string = '';
  educationLevel: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onScroll(event: any) {
    const scrollElement = event.detail.scrollTop;
    const headerImage = document.querySelector('.header-image-container') as HTMLElement;
    if (headerImage) {
      const opacity = Math.max(0, 1 - scrollElement / 300);
      headerImage.style.opacity = opacity.toString();
    }
  }

  async onLogin() {
    const userAccountString = localStorage.getItem('userAccount');
    if (!userAccountString) {
      await this.presentToast('No hay cuentas registradas. Por favor, crea una cuenta primero.', 'danger');
      return;
    }

    if (!this.rut || !this.educationLevel || !this.password) {
      await this.presentToast('RUT, nivel educacional y contraseña son obligatorios', 'danger');
      return;
    }

    if (!this.validateRUT(this.rut)) {
      await this.presentToast('RUT inválido, debe tener el formato 123456789-1', 'danger');
      return;
    }

    const userAccount = JSON.parse(userAccountString);
    
    const normalizedStoredLevel = this.normalizeEducationLevel(userAccount.educationLevel);
    const normalizedInputLevel = this.normalizeEducationLevel(this.educationLevel);

    console.log('Stored:', userAccount);
    console.log('Input:', { rut: this.rut, educationLevel: normalizedInputLevel, password: this.password });

    if (
      this.rut !== userAccount.rut ||
      normalizedInputLevel !== normalizedStoredLevel ||
      this.password !== userAccount.password
    ) {
      await this.presentToast('RUT, nivel educacional o contraseña incorrectos', 'danger');
      return;
    }

    await this.presentToast('Inicio de sesión exitoso', 'success');
    this.router.navigate(['/principal']);
  }

  validateRUT(rut: string): boolean {
    const rutPattern = /^\d{1,8}-[kK0-9]$/;
    return rutPattern.test(rut);
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

  onRegister() {
    this.router.navigate(['/creacioncuenta']);
  }

  onRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}




