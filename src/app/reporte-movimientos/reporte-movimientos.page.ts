import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { Storage } from '@ionic/storage';
import { AlertController, ModalController } from '@ionic/angular';
import { IpMaquinaPage } from '../ip-maquina/ip-maquina.page';

@Component({
  selector: 'app-reporte-movimientos',
  templateUrl: './reporte-movimientos.page.html',
  styleUrls: ['./reporte-movimientos.page.scss'],
})
export class ReporteMovimientosPage implements OnInit {
  IdUsuario:any;
  ipServidor: any;

  constructor(
    public router: Router,
    public storage : Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
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

}
