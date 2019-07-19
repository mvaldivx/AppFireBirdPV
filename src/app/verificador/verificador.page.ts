import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IpMaquinaPage } from '../ip-maquina/ip-maquina.page';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ListaProductosPage } from '../lista-productos/lista-productos.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-verificador',
  templateUrl: './verificador.page.html',
  styleUrls: ['./verificador.page.scss'],
})
export class VerificadorPage implements OnInit {
  codigo:any ='';
  codigoMostrar:'';
  id:'';
  Descripcion: '';
  Existencia: '';
  Venta:'';
  cantidad:'';
  productos:any=[];
  ipServidor: any;

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public barcodeScanner: BarcodeScanner,
    public storage: Storage,
    public router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getIp();
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
          },
          cssClass: "modalProductos"
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) { 
        this.id = detail.data.id;
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
        var encontrado:boolean= false;
        this.codigo = this.codigo.toUpperCase();
        let data = new HttpParams()
        .append('tipo', '0')
        .append('cadena',this.codigo.toUpperCase())
        //.append('dataType', 'application/json; charset=utf-8')
        //.append('headers', 'Access-Control-Allow-Origin ="*"');
        //data.append('cadena',cadena);
        
        this.http.get('http://'+ this.ipServidor +'/WSFB/Api/Productos/ProductosFiltrados',{params:data}).subscribe(data => {
          var prod ;
          prod = data;
          if(prod.length > 0){
            prod.forEach(element => {
              this.id = element.id; 
              this.codigoMostrar = element.codigo; 
              this.Descripcion = element.Descripcion; 
              this.Existencia = element.Existencia;
              this.Venta = element.Venta;
              encontrado = true;
            });
            
          }else{
            this.presentToast('Producto no encontrado');
          }
          
        },(err) =>{this.presentToast('Ocurrio un error');});
      }
    }
  }

  codigoChange(){
    if(this.codigo = ''){
      this.id = ''; 
      this.codigoMostrar = ''; 
      this.Descripcion = ''; 
      this.Existencia = '';
      this.Venta = '';
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
