import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { GestureController } from '@ionic/angular';  

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  rotation: number = 0;  

  constructor(
    private router: Router,
    private gestureCtrl: GestureController  
  ) { }

  ngOnInit() {
    this.enableImageRotation();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  onReload() {
    console.log('Recargar contenido...');
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
}

