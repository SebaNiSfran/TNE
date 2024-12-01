import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-portal-pago',
  templateUrl: './portal-pago.page.html',
  styleUrls: ['./portal-pago.page.scss'],
})
export class PortalPagoPage {
  // Campos del formulario
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paymentAmount: number = 0;

  // Estado del formulario
  formSubmitted = false;
  paymentSuccess = false;

  // Fecha de pago y enlace de comprobante
  paymentDate = new Date().toLocaleDateString();
  downloadLink: string = 'assets/comprobante.png';

  constructor(private router: Router) {} // Inyectar el Router

  // Lógica de pago
  onPay() {
    this.formSubmitted = true;
    if (this.cardNumber && this.expiryDate && this.cvv && this.paymentAmount >= 1000 && this.paymentAmount <= 100000) {
      this.paymentSuccess = true;
      console.log('Pago realizado exitosamente.');
    } else {
      console.log('Por favor, complete todos los campos correctamente.');
    }
  }

  // Reiniciar el formulario
  resetForm() {
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    this.paymentAmount = 0;
    this.paymentSuccess = false;
    this.formSubmitted = false;
    console.log('Formulario reiniciado.');
  }

  // Volver a la página principal
  goBackToHome() {
    this.resetForm(); // Limpiar todos los datos
    this.router.navigate(['/principal']); // Navegar a la página principal
    console.log('Navegando a la página principal.');
  }
}
