import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { OverlayEventDetail } from '@ionic/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.page.html',
  styleUrls: ['./modificar-inventario.page.scss'],
})
export class ModificarInventarioPage implements OnInit {
codigo:'';
codigoMostrar:'';
Descripcion: '';
Existencia: '';
Costo:'';
productos:any=[];

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.getData()
  }  
  
  getData(){
    this.http.get('http://localhost:8080/firebird/ObtieneProductos.php',{}).subscribe(data => {
      var prod ;
      prod = data;
      prod.forEach(element => {
        this.productos.push({id:element.id, 
                            codigo: element.codigo, 
                            Descripcion: element.Descripcion, 
                            Existencia: element.Existencia, 
                            Costo: element.Costo})
      });
    })
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async openModal() {
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: ListaProductosPage,
          componentProps: {
             aParameter: true,
             otherParameter: this.productos
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
        this.codigo= detail.data.codigo;
        this.codigoMostrar= detail.data.codigo;
        this.Descripcion = detail.data.Descripcion;
        this.Existencia = detail.data.Existencia;
        this.Costo = detail.data.Costo;
       }
    });
    
    await modal.present();
  }

  codigoEnter(){
    this.BuscaCodigo();
  }

  codigoBlur(){
    this.BuscaCodigo();
  }

  BuscaCodigo(){
    if(this.codigo != undefined){
      if(this.codigo.length > 0){
        var encontrado= false;
        this.productos.forEach(element => {
          if(this.codigo.length === element.codigo.length){
            if(this.codigo.toUpperCase() === element.codigo.toUpperCase()){
              this.Descripcion = element.Descripcion;
              this.codigoMostrar = element.codigo;
              this.Existencia = element.Existencia;
              this.Costo = element.Costo;
              encontrado = true;
            }
          }
        });
        if(!encontrado){
          this.presentToast('Producto no encontrado');
        }
      }
    }
  }
}
