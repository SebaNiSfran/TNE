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
  tneImagen: string = ''; // Ruta de la imagen TNE

  constructor(
    private router: Router,
    private gestureCtrl: GestureController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.enableImageRotation(); // Activar rotación de imagen
    this.loadUserInfo(); // Cargar información del usuario
  }

  // Logout: limpia localStorage y redirige a login
  onLogout() {
    localStorage.removeItem('loggedInUserEmail');
    this.presentToast('Sesión cerrada correctamente.');
    this.router.navigate(['/login']);
  }

  onReload() {
    this.presentToast('Redirigiendo al portal de pagos...');
    this.router.navigate(['/portal-pago']); 
  }

  // Navegación a revalidar TNE
  onRevalidarTNE() {
    this.router.navigate(['/revalidar-tne']);
  }

  // Navegación a recuperar TNE
  onRecuperarTNE() {
    this.router.navigate(['/recuperar-tne']);
  }

  // Rotación de imagen con gestos
  enableImageRotation() {
    const image = document.getElementById('movableImage');
    if (image) {
      const gesture = this.gestureCtrl.create({
        el: image,
        gestureName: 'rotate',
        onMove: (ev) => {
          this.rotation += ev.deltaX / 25;
          image.style.transform = `rotateY(${this.rotation}deg)`;
        },
      });
      gesture.enable(true);
    }
  }

  // Carga de la información del usuario logueado
  loadUserInfo() {
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    console.log('Email recuperado de localStorage:', loggedInUserEmail); // Depuración

    if (!loggedInUserEmail) {
      this.setDefaultUserInfo('No se encontró un usuario logueado.');
      return;
    }

    const existingUsersString = localStorage.getItem('userAccounts');
    if (!existingUsersString) {
      this.setDefaultUserInfo('No hay usuarios registrados en el sistema.');
      return;
    }

    let existingUsers: any[];
    try {
      existingUsers = JSON.parse(existingUsersString);
      if (!Array.isArray(existingUsers)) throw new Error('Formato inválido en userAccounts.');
    } catch (error) {
      console.error('Error al analizar userAccounts:', error);
      this.setDefaultUserInfo('Error al procesar datos del sistema.');
      return;
    }

    const loggedInUser = existingUsers.find((user: any) => user.email === loggedInUserEmail);
    if (loggedInUser) {
      this.nombreUsuario = loggedInUser.fullName || 'Usuario';
      this.nivelEducacional = this.capitalizeFirstLetter(loggedInUser.educationLevel) || 'No especificado';
      this.setTneImage();
    } else {
      this.setDefaultUserInfo('No se encontró información para el usuario logueado.');
    }
  }

  // Mensaje y configuración predeterminada para errores
  setDefaultUserInfo(errorMessage: string) {
    console.warn(errorMessage);
    this.nombreUsuario = 'Usuario';
    this.nivelEducacional = 'No especificado';
    this.tneImagen = 'assets/default-tne.png'; // Imagen predeterminada genérica
  }

  // Configuración de la imagen TNE según el nivel educacional
  setTneImage() {
    const tneImages: { [key: string]: string } = {
      Basica: 'assets/tnebasica.jpeg',
      Media: 'assets/tnemedia.png',
      Superior: 'assets/tnesuperior.jpeg',
    };
  
    this.tneImagen = tneImages[this.nivelEducacional] || 'assets/default-tne.png';
  }
  

  // Capitalizar la primera letra de una cadena
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Mostrar un mensaje 
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
