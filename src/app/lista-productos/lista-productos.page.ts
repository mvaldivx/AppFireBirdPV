import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { IpMaquinaPage } from '../ip-maquina/ip-maquina.page';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
productos: any[]= [];
productosShow:any[] = [];
fCodigo:'';
fDescripcion:'';
filtrado = false;
ipServidor: any;
contProd=30;

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public storage : Storage,
    public alertCtrl: AlertController
  ) { 
  }

  ngOnInit() {
    this.getIp();
  }

  getIp(){
    this.storage.get('ipServidor').then((data)=>{
      if(data != undefined){
        this.ipServidor = data;
         this.getData();
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
  
  closeModal(){
    this.modalCtrl.dismiss({codigo:''});
  }

  productoSeleccionado(p){
    this.modalCtrl.dismiss({id:p.id,codigo:p.codigo,Descripcion:p.Descripcion, Existencia: p.Existencia, Venta: p.Venta});
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 1000
    });
    await loading.present();
  }

   getData(){
     if(this.ipServidor != undefined){
        this.productosShow=[];
      this.http.get('http://'+ this.ipServidor +'/firebird/ObtieneProductos.php',{}).subscribe(data => {
        var prod ;
        prod = data;
        this.productos = prod;
        this.ObtieneProdShow();
        //this.productosShow = this.productos;
       
        });
     }
  }

  ObtieneProdShow(){
    for(let i = 0; i < 30; i++){
      this.productosShow.push(this.productos[i]);
    }
  }

  ObtieneProdShowev(event){
    console.log("entro");
    setTimeout(()=>{
      var cantAct = this.contProd
      for(let i = cantAct; i < cantAct + 30; i++){
          this.productosShow.push(this.productos[i]);
          this.contProd += 1;
        }
      event.target.complete();
      
    },3500);
  }

  FilterData(tipo){
    var continuar: boolean = false;
    if(tipo===0){
      if(this.fCodigo != undefined){
        if(this.fCodigo.length >0){
          continuar = true;
        }
      }
    }else{
      if(this.fDescripcion != undefined){
        if(this.fDescripcion.length >0){
          continuar = true;
        }
      }
    }
    if(continuar){
      if(tipo === 0){
        this.fDescripcion= '';
      }else{
        this.fCodigo='';
      }
      this.productosShow =[];
      var cadena ="";
      if(tipo === 0){
        cadena = this.fCodigo.toUpperCase();
      }else{
        cadena = this.fDescripcion.toUpperCase();
      }

      if(tipo===0){
        this.productosShow = this.productos.filter((item)=>{
          return item.codigo.toUpperCase().indexOf(this.fCodigo.toUpperCase()) > -1;
        })
      }else{
        this.productosShow = this.productos.filter((item)=>{
          return item.Descripcion.toUpperCase().indexOf(this.fDescripcion.toUpperCase()) > -1;
        })
      }
      
    }else{
      this.productosShow = this.productos.filter((item)=>{
        return item.codigo.toUpperCase().indexOf(this.fCodigo.toUpperCase()) > -1;
      })
    }
  }

}
