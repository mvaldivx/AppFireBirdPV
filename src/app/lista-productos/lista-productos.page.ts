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
    this.modalCtrl.dismiss({codigo:p.codigo,Descripcion:p.Descripcion, Existencia: p.Existencia, Venta: p.Venta});
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      duration: 1000
    });
    await loading.present();
  }

   async getData(){
     if(this.ipServidor != undefined){
        this.productosShow=[];
      this.http.get('http://'+ this.ipServidor +'/firebird/ObtieneProductos.php',{}).subscribe(data => {
        var prod ;
        prod = data;
        prod.forEach(element => {
          this.productosShow.push({id:element.id, 
                              codigo: element.codigo, 
                              Descripcion: element.Descripcion, 
                              Existencia: element.Existencia, 
                              Venta: element.Venta})
        });
      })
     }
  }

  filtrar(tipo){

    if((this.fCodigo.length > 0 && tipo === 0 )|| (this.fDescripcion.length > 0 && tipo === 1)){
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
      let data = new HttpParams().append('tipo', tipo).append('cadena',cadena).append('dataType', 'application/json; charset=utf-8');
      //data.append('cadena',cadena);
      
      this.http.get('http://'+ this.ipServidor +'/firebird/ProductosFiltrados.php',{params:data}).subscribe(data => {
        var prod ;
        prod = data;
        prod.forEach(element => {
          this.productosShow.push({id:element.id, 
                              codigo: element.codigo, 
                              Descripcion: element.Descripcion, 
                              Existencia: element.Existencia, 
                              Venta: element.Venta})
        });
        this.filtrado = true;
      })
    }else{
      if(this.filtrado){
        this.presentLoading()
        this.getData();
        this.filtrado = false;
      }
    }
  }

}
