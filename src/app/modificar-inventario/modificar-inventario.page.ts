import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { OverlayEventDetail } from '@ionic/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { isNull } from 'util';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IpMaquinaPage } from '../ip-maquina/ip-maquina.page';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.page.html',
  styleUrls: ['./modificar-inventario.page.scss'],
})
export class ModificarInventarioPage implements OnInit {
codigo:any ='';
codigoMostrar:'';
id:'';
Descripcion: '';
Existencia: '';
Venta:'';
cantidad:'';
productos:any=[];
ipServidor: any;
IdUsuario:any;

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public storage: Storage,
    public router: Router,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.verificaUsuario()
    this.getIp();
  }  
  
  verificaUsuario(){
    this.storage.get('usuario').then((data)=>{
      if(isNull(data)){
       this.router.navigateByUrl('login');
      }else{
        this.IdUsuario = data.id;
      }
     })
  }

  getIp(){
    this.storage.get('ipServidor').then((data)=>{
      if(data != undefined){
        this.ipServidor = data;
      }else{
        this.presentAlert();
      }      
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'IP de Servidor No asiganada',
      message: 'Debe Configurar la ip del servidor.',
      buttons: [{
        text:'Aceptar', 
        handler: () => {
          this.configuraIp();
       }
      }]
    });

    await alert.present();
  }

  async configuraIp(){
    const modal: HTMLIonModalElement =
    await this.modalCtrl.create({
        component: IpMaquinaPage,
        componentProps: {
          aParameter: true,
          otherParameter: true
        }
    });
    await modal.present();
  }
  

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 1000
    });
    await loading.present();
  }

 UpdateProd(){
    if(this.codigoMostrar != null && this.cantidad != null){
      this.presentLoading();
      let data = new HttpParams().append('codigo', this.codigoMostrar)
      .append('cant',this.cantidad)
      .append('id', this.id)
      .append('venta', this.Venta)
      .append('IdUsuario', this.IdUsuario)
      .append('dataType', 'application/json; charset=utf-8');
      this.http.get('http://'+ this.ipServidor +'/firebird/ActualizaInventario.php',{params: data}).subscribe(data=>{
        if(data != null){
          var res : any;
          res = data;
          this.presentToast(res.respuesta)
          this.id='';
          this.codigo= '';
          this.codigoMostrar= '';
          this.Descripcion = undefined;
          this.Existencia = '';
          this.Venta = '';
          this.cantidad = '';
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
        let data = new HttpParams().append('tipo', '0').append('cadena',this.codigo).append('dataType', 'application/json; charset=utf-8');
        //data.append('cadena',cadena);
        
        this.http.get('http://'+ this.ipServidor +'/firebird/ProductosFiltrados.php',{params:data}).subscribe(data => {
          var prod ;
          prod = data;
          prod.forEach(element => {
            this.productos.push({id:element.id, 
                                codigo: element.codigo, 
                                Descripcion: element.Descripcion, 
                                Existencia: element.Existencia, 
                                Venta: element.Venta})
          });
        });

          if(!encontrado){
            this.presentToast('Producto no encontrado');
          }
      }
    }
  }

  EscanearCodigo(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.codigo = barcodeData.text.toString();
      this.BuscaCodigo();
        //alert(JSON.stringify(barcodeData));
     }).catch(err => {
         alert('Error: ' +  err);
     });
  }
}
