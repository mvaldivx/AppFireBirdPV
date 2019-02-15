import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.page.html',
  styleUrls: ['./modificar-inventario.page.scss'],
})
export class ModificarInventarioPage implements OnInit {
codigo:'';
  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: ListaProductosPage,
          componentProps: {
             aParameter: true,
             otherParameter: new Date()
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
        this.codigo= detail.data.codigo;
         console.log('The result:', detail.data);
       }
    });
    
    await modal.present();
}
}
