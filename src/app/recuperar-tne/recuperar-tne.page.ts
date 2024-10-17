import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-tne',
  templateUrl: './recuperar-tne.page.html',
  styleUrls: ['./recuperar-tne.page.scss'],
})
export class RecuperarTnePage {
  rut = '';
  fullName = '';
  comuna = '';
  establecimiento = '';
  email = '';
  telefono = '';
  nivelEducacional = '';
  isPhysical = false;
  edad: number | null = null;
  imageDNI: File | null = null;
  imageCertificado: File | null = null;
  imageConstancia: File | null = null;
  imageComprobante: File | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  navigateToPrincipal() {
    this.router.navigate(['/principal']);
  }

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
    if (this.isPhysical) {
      return this.rut && this.fullName && this.comuna && this.establecimiento &&
             this.email && this.telefono && this.nivelEducacional && this.imageDNI &&
             this.imageCertificado && this.imageConstancia && this.edad &&
             (this.nivelEducacional !== 'superior' || this.imageComprobante);
    }
    return this.rut && this.fullName && this.comuna && this.establecimiento &&
           this.email && this.telefono && this.nivelEducacional && this.imageDNI &&
           this.imageCertificado;
  }

  uploadImage(type: string) {
    if (type === 'dni') {
      console.log('Cargando imagen de DNI');
    } else if (type === 'certificado') {
      console.log('Cargando imagen de Certificado');
    } else if (type === 'constancia') {
      console.log('Cargando imagen de Constancia Policial');
    } else if (type === 'comprobante') {
      console.log('Cargando imagen de Comprobante de Pago');
    }
  }

  togglePhysicalFields() {
    if (!this.isPhysical) {
      this.imageConstancia = null;
      this.imageComprobante = null;
      this.edad = null;
    }
  }
}


