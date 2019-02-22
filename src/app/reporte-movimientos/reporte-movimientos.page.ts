import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController } from '@ionic/angular';
import { IpMaquinaPage } from '../ip-maquina/ip-maquina.page';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-reporte-movimientos',
  templateUrl: './reporte-movimientos.page.html',
  styleUrls: ['./reporte-movimientos.page.scss'],
})
export class ReporteMovimientosPage implements OnInit {
  IdUsuario:any;
  ipServidor: any;
  Movimientos:any[];
  constructor(
    public router: Router,
    public storage : Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.verificaUsuario()
  }

  close(){
    this.router.navigateByUrl('home');
  }

  verificaUsuario(){
    this.storage.get('usuario').then((data)=>{
      if(isNull(data)){
       this.router.navigateByUrl('login');
      }else{
        this.IdUsuario = data.id;
        this.getIp();
      }
     })
  }

  getIp(){
    this.storage.get('ipServidor').then((data)=>{
      if(data != undefined){
        this.ipServidor = data;
        this.getMovimientos();
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

  getMovimientos(){
    var date = new Date();
    var dia= date.getDate();
    var mes= (date.getMonth() + 1);
    var anio= date.getFullYear();
    let data = new HttpParams()
    .append('dia',dia)
    .append('mes', mes)
    .append('anio', anio)
    .append('IdUsuario', this.IdUsuario)
    .append('dataType', 'application/json; charset=utf-8');
    this.http.get('http://'+ this.ipServidor +'/firebird/ObtieneMovimientos.php',{params: data}).subscribe(data=>{
     var mov;
     mov = data;  
     this.Movimientos =[];
     mov.forEach(element => {
       this.Movimientos.push(element)
     });   
    console.log(JSON.stringify(data));
    },(err) =>{console.log('Ocurrio un error : ' + JSON.stringify(err))})

  }
}
