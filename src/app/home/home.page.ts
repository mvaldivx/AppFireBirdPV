import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController } from '@ionic/angular';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public storage: Storage,
    public menu: MenuController,
    public router: Router,
    public navCtrl: NavController
  ){
    this.ValidaUsuario();
  }

  ValidaUsuario(){
    this.storage.get('usuario').then((data)=>{
     if(isNull(data)){
      this.navCtrl.navigateRoot('login');
     }
    })
  }



  goPage(page){
    this.router.navigateByUrl(page)
  }

}
