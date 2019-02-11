import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productos:any;
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public menu: MenuController,
    public router: Router
  ){
    this.ValidaUsuario();
    this.getData();
  }

  ValidaUsuario(){
    this.storage.get('usuario').then((data)=>{
     if(isNull(data)){
      this.router.navigateByUrl('login');
     }
    })
  }

  getData(){
    this.http.get('http://localhost:55688/api/Productos/GetProductos',{}).subscribe(data => {
      this.productos = data;
      console.log(JSON.stringify(data));
    })
  }


}
