import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  email: string = '';
  animation: any;

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  async onSubmit() {
    if (this.email) {
      console.log('Enviar enlace de recuperación a', this.email);

      this.email = '';

      const toast = await this.toastController.create({
        message: 'Enlace de recuperación enviado con éxito',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      console.log('Correo electrónico es obligatorio');
    }
  }

  onBack() {
    this.router.navigate(['/login']);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

}


