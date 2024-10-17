import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-revalidar-tne',
  templateUrl: './revalidar-tne.page.html',
  styleUrls: ['./revalidar-tne.page.scss'],
})
export class RevalidarTnePage {
  rut = '';
  fullName = '';
  comuna = '';
  establecimiento = '';
  email = '';
  telefono = '';
  nivelEducacional = '';
  imageDNI: File | null = null;
  imageCertificado: File | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    if (this.isFormValid()) {
      const toast = await this.toastController.create({
        message: 'Datos enviados correctamente.',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos.',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  isFormValid() {
    return this.rut && this.fullName && this.comuna && this.establecimiento &&
           this.email && this.telefono && this.nivelEducacional && this.imageDNI && this.imageCertificado;
  }

  uploadImage(type: string) {
    if (type === 'dni') {
      console.log('Cargando imagen de DNI');
    } else if (type === 'certificado') {
      console.log('Cargando imagen de Certificado');
    }
  }

  //  para navegar a la página principal
  goBack() {
    this.router.navigate(['/principal']);
  }
}


