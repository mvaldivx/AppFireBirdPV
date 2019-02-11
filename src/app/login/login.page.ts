import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public storage : Storage,
    public router: Router
  ) { }

  ngOnInit() {
    this.validaUsuario()
  }

  validaUsuario(){
    this.storage.get('usuario').then((data) =>{
      if(isNull(data) === false){
        this.router.navigateByUrl('home');
      }
    })
  }

  IniciarSesion(){
    this.storage.set('usuario', {usuario:'a'})
    this.router.navigateByUrl('home');
  }
}
