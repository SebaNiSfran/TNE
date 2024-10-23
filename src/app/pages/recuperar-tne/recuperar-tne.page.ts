import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

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

  // Agregar propiedades para mostrar los nombres de los archivos
  imageDNIName: string = '';
  imageCertificadoName: string = '';
  imageConstanciaName: string = '';
  imageComprobanteName: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private dbService: DbService
  ) {}

  // Nuevo método para manejar la selección de archivos
  async onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      // Verificar el tamaño del archivo (por ejemplo, máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB en bytes
      if (file.size > maxSize) {
        const toast = await this.toastController.create({
          message: 'El archivo es demasiado grande. Máximo 5MB permitido.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        return;
      }

      // Verificar el tipo de archivo
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
        case 'constancia':
          this.imageConstancia = file;
          this.imageConstanciaName = file.name;
          break;
        case 'comprobante':
          this.imageComprobante = file;
          this.imageComprobanteName = file.name;
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

  // Actualizar el método onSubmit para manejar los archivos
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
        formData.append('isPhysical', String(this.isPhysical));
        if (this.edad) formData.append('edad', String(this.edad));

        // Agregar imágenes
        if (this.imageDNI) formData.append('imageDNI', this.imageDNI);
        if (this.imageCertificado) formData.append('imageCertificado', this.imageCertificado);
        if (this.imageConstancia) formData.append('imageConstancia', this.imageConstancia);
        if (this.imageComprobante) formData.append('imageComprobante', this.imageComprobante);

        // Guardar en la base de datos
        const resultado = await this.dbService.guardarRecuperacion(formData);

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

  // Los demás métodos permanecen igual...
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

  limpiarFormulario() {
    this.rut = '';
    this.fullName = '';
    this.comuna = '';
    this.establecimiento = '';
    this.email = '';
    this.telefono = '';
    this.nivelEducacional = '';
    this.isPhysical = false;
    this.edad = null;
    this.imageDNI = null;
    this.imageCertificado = null;
    this.imageConstancia = null;
    this.imageComprobante = null;
    // Limpiar nombres de archivos
    this.imageDNIName = '';
    this.imageCertificadoName = '';
    this.imageConstanciaName = '';
    this.imageComprobanteName = '';
  }

  togglePhysicalFields() {
    if (!this.isPhysical) {
      this.imageConstancia = null;
      this.imageComprobante = null;
      this.imageConstanciaName = '';
      this.imageComprobanteName = '';
      this.edad = null;
    }
  }

  navigateToPrincipal() {
    this.router.navigate(['/principal']);
  }
}
