import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { OverlayEventDetail } from '@ionic/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
Venta:'';
cantidad:'';
productos:any=[];

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.getData()
  }  
  
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 1000
    });
    await loading.present();
  }

  getData(){
    this.http.get('http://localhost/firebird/ObtieneProductos.php',{}).subscribe(data => {
      var prod ;
      prod = data;
      prod.forEach(element => {
        this.productos.push({id:element.id, 
                            codigo: element.codigo, 
                            Descripcion: element.Descripcion, 
                            Existencia: element.Existencia, 
                            Venta: element.Venta})
      });
    })
  }

 UpdateProd(){
    if(this.codigoMostrar != null && this.cantidad != null){
      this.presentLoading();
      let data = new HttpParams().append('codigo', this.codigoMostrar).append('cant',this.cantidad).append('dataType', 'application/json; charset=utf-8');
      this.http.get('http://localhost/firebird/ActualizaInventario.php',{params: data}).subscribe(data=>{
        if(data != null){
          var res : any;
          res = data;
          this.presentToast(res.respuesta)
          this.codigo= '';
          this.codigoMostrar= '';
          this.Descripcion = undefined;
          this.Existencia = '';
          this.Venta = '';
          this.cantidad = '';
          this.getData();
        }else{
          this.presentToast("Ocurrio un error")
        }
      })
    }
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async openModal() {
    this.presentLoading()
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: ListaProductosPage,
          componentProps: {
             aParameter: true,
             otherParameter: true
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
        this.codigo= detail.data.codigo;
        this.codigoMostrar= detail.data.codigo;
        this.Descripcion = detail.data.Descripcion;
        this.Existencia = detail.data.Existencia;
        this.Venta = detail.data.Venta;
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
              this.Venta = element.Venta;
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

  EscanearCodigo(){
    this.barcodeScanner.scan().then(barcodeData => {
        alert('Barcode data: ' +  barcodeData);
     }).catch(err => {
         alert('Error: ' +  err);
     });
  }
}
