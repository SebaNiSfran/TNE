import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  rotation: number = 0;
  nombreUsuario: string = '';
  nivelEducacional: string = '';

  constructor(
    private router: Router,
    private gestureCtrl: GestureController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.enableImageRotation();
    this.loadUserInfo();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  onReload() {
    this.presentToast('Recarga iniciada');
  }

  onRevalidarTNE() {
    this.router.navigate(['/revalidar-tne']);
  }

  onRecuperarTNE() {
    this.router.navigate(['/recuperar-tne']);
  }

  enableImageRotation() {
    const image = document.getElementById('movableImage');
    if (image) {
      const gesture = this.gestureCtrl.create({
        el: image,
        gestureName: 'rotate',
        onMove: (ev) => {
          this.rotation += ev.deltaX / 25;
          image.style.transform = `rotateY(${this.rotation}deg)`;
        }
      });
      gesture.enable(true);
    }
  }

  loadUserInfo() {
    const userAccountString = localStorage.getItem('userAccount');
    if (userAccountString) {
      const userAccount = JSON.parse(userAccountString);
      this.nombreUsuario = userAccount.fullName || 'Usuario';
      this.nivelEducacional = this.capitalizeFirstLetter(userAccount.educationLevel) || 'No especificado';
    } else {
      this.nombreUsuario = 'Usuario';
      this.nivelEducacional = 'No especificado';
    }
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}

