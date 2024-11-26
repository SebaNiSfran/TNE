import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-pago',
  templateUrl: './portal-pago.page.html',
  styleUrls: ['./portal-pago.page.scss'],
})
export class PortalPagoPage {
  // Propiedades opcionales
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;

  // Monto a recargar en CLP, inicializado en 0
  paymentAmount: number = 0;

  // Fecha de pago
  paymentDate = new Date().toLocaleDateString();

  // Estado del formulario
  formSubmitted = false;
  paymentSuccess = false;

  // URL del enlace de descarga (comprobante)
  downloadLink: string = 'assets/comprobante.png';

  constructor() {}

  // Función para manejar el envío del formulario
  onPay() {
    this.formSubmitted = true; // Indicamos que el formulario ha sido enviado

    // Validación de los campos del formulario
    if (this.cardNumber && this.expiryDate && this.cvv && this.paymentAmount > 0) {
      // Si todos los campos están completos y el monto es mayor que 0, marcamos el pago como exitoso
      this.paymentSuccess = true;
      // Aquí podrías agregar la lógica para procesar el pago (por ejemplo, interactuar con una API)
      console.log('Pago realizado exitosamente.');
    } else {
      // Si algún campo falta o el monto no es válido, el pago no es exitoso
      this.paymentSuccess = false;
      console.log('Por favor, complete todos los campos correctamente.');
    }
  }

  // Función para reiniciar el formulario
  resetForm() {
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    this.paymentAmount = 0;
    this.paymentSuccess = false;
    this.formSubmitted = false;
    console.log('Formulario reiniciado para nueva recarga.');
  }
}
