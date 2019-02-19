import { Component } from '@angular/core';

import { Platform, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IpMaquinaPage } from './ip-maquina/ip-maquina.page';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  CerrarSesion(){
    this.storage.remove('usuario');
    window.location.reload()
  }

  goPage(page){
    this.menuCtrl.close('first')
    this.router.navigateByUrl(page)
  }

  async ConexionServidor() {
    this.menuCtrl.close('first')
    const modal: HTMLIonModalElement =
       await this.modalCtrl.create({
          component: IpMaquinaPage,
          componentProps: {
             aParameter: true,
             otherParameter: true
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail !== null) {
        
       }
    });
    
    await modal.present();
  }
}
