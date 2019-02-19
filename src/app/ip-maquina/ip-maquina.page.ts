import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ip-maquina',
  templateUrl: './ip-maquina.page.html',
  styleUrls: ['./ip-maquina.page.scss'],
})
export class IpMaquinaPage implements OnInit {
  DireccionIp='';
  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient,
    public alertCtrl: AlertController,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.ObtieneIp()
  }

  ObtieneIp(){
    this.storage.get('ipServidor').then((data)=>{
      this.DireccionIp = data;
    });
  }

  closeModal(){
    this.modalCtrl.dismiss({codigo:''});
  }

  TestConnection(){
    this.http.get('http://'+ this.DireccionIp + '/firebird/ProbarConexion.php',{}).subscribe(data =>{
      this.presentAlert('Exito','Conectado exitosamente')
    },error => this.presentAlert('Error','Ocurrio un error en la conexion'));
  }

  async presentAlert(header, mensaje) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: '',
      message: mensaje,
      buttons: [{
        text:'Aceptar'
      }]
    });

    await alert.present();
  }

  SaveConnection(){
    this.storage.set('ipServidor', this.DireccionIp);
    this.modalCtrl.dismiss({codigo:''});
  }
}
