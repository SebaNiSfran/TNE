import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

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

  // Agregar propiedades para mostrar nombres de archivos
  imageDNIName: string = '';
  imageCertificadoName: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private dbService: DbService
  ) {}

  // Nuevo método para manejar la selección de archivos
  async onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      // Verificar el tamaño del archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        const toast = await this.toastController.create({
          message: 'El archivo es demasiado grande. Máximo 5MB permitido.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        return;
      }

      // Verificar que sea una imagen
      if (!file.type.startsWith('image/')) {
        const toast = await this.toastController.create({
          message: 'Por favor, seleccione solo archivos de imagen.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        return;
      }

      // Asignar el archivo según el tipo
      switch(type) {
        case 'dni':
          this.imageDNI = file;
          this.imageDNIName = file.name;
          break;
        case 'certificado':
          this.imageCertificado = file;
          this.imageCertificadoName = file.name;
          break;
      }

      // Mostrar mensaje de éxito
      const toast = await this.toastController.create({
        message: 'Imagen cargada correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    }
  }

  // Método para iniciar la selección de archivo
  uploadImage(type: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => this.onFileSelected(e, type);
    input.click();
  }

  async onSubmit() {
    if (this.isFormValid()) {
      try {
        // Crear FormData para enviar archivos
        const formData = new FormData();
        
        // Agregar datos del formulario
        formData.append('rut', this.rut);
        formData.append('fullName', this.fullName);
        formData.append('comuna', this.comuna);
        formData.append('establecimiento', this.establecimiento);
        formData.append('email', this.email);
        formData.append('telefono', this.telefono);
        formData.append('nivelEducacional', this.nivelEducacional);

        // Agregar imágenes
        if (this.imageDNI) formData.append('imageDNI', this.imageDNI);
        if (this.imageCertificado) formData.append('imageCertificado', this.imageCertificado);

        // Guardar en la base de datos
        const resultado = await this.dbService.guardarRevalidacion(formData);

        if (resultado) {
          const toast = await this.toastController.create({
            message: 'Datos guardados correctamente en la base de datos.',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          this.limpiarFormulario();
        } else {
          throw new Error('Error al guardar en la base de datos');
        }
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al guardar los datos.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
      }
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
           this.email && this.telefono && this.nivelEducacional && this.imageDNI && 
           this.imageCertificado;
  }

  limpiarFormulario() {
    this.rut = '';
    this.fullName = '';
    this.comuna = '';
    this.establecimiento = '';
    this.email = '';
    this.telefono = '';
    this.nivelEducacional = '';
    this.imageDNI = null;
    this.imageCertificado = null;
    // Limpiar nombres de archivos
    this.imageDNIName = '';
    this.imageCertificadoName = '';
  }

  goBack() {
    this.router.navigate(['/principal']);
  }
}

