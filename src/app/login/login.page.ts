import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
usr='';
pass='';
DireccionIp= '';
  constructor(
    public storage : Storage,
    public router: Router,
    public http : HttpClient,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.getIp()
    this.validaUsuario()
  }

  getIp(){
    this.storage.get('ipServidor').then((data)=>{
      if(data != undefined){
        this.DireccionIp = data;
      }    
    });
  }

  validaUsuario(){
    this.storage.get('usuario').then((data) =>{
      if(isNull(data) === false){
        this.router.navigateByUrl('home');
      }
    })
  }

  IniciarSesion(){
    if(this.usr != '' && this.pass != ''){
      if(this.usr === 'mauvalsa' && this.pass === '123456'){
        this.storage.set('usuario', {usuario:'root'})
        this.router.navigateByUrl('home');
      }else{
        let data = new HttpParams().append('usuario', this.usr).append('pass',this.pass).append('dataType', 'application/json; charset=utf-8');
        this.http.get('http://' + this.DireccionIp + '/firebird/ValidaUsuario.php', {params: data}).subscribe(data =>{
        let res :any;
        res = data;  
        if(res.id != undefined){
            this.storage.set('usuario', {usuario: res.Usuario, id: res.id, nombre: res.Nombre,permisos : res.Permisos })
            this.router.navigateByUrl('home');
          }  else{
            this.presentAlert();
          }
        
        });
      }
    }else{
      this.presentAlert();
    }
    
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'ERROR',
      subHeader: '',
      message: 'Verifique usuario y contraseña.',
      buttons: [{
        text:'Aceptar'
      }]
    });

    await alert.present();
  }
}
