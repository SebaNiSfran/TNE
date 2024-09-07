import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController 
  ) { }

  ngOnInit() { }

  async onLogin() {
    if (this.email && this.password) {
      if (!this.validateEmail(this.email)) {
        const toast = await this.toastController.create({
          message: 'Correo inválido, debe tener el formato @example.com',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return;
      }

      console.log('Email:', this.email);
      console.log('Contraseña:', this.password);

      const toast = await this.toastController.create({
        message: 'Inicio de sesión exitoso',
        duration: 2000,  
        color: 'success',
      });
      toast.present();

      this.router.navigate(['/principal']);
    } else {
      const toast = await this.toastController.create({
        message: 'Correo y contraseña son obligatorios',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return emailPattern.test(email);
  }

  onRegister() {
    this.router.navigate(['/creacioncuenta']);
  }

  onRecoverPassword() {
    this.router.navigate(['/recover-password']);
  }
}
