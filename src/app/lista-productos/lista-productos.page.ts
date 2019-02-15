import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
productos;
fCodigo:'';
fDescripcion:'';

  constructor(
    public modalCtrl: ModalController,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.getData();
  }

  closeModal(){
    this.modalCtrl.dismiss({codigo:''});
  }

  getData(){
    this.http.get('http://localhost:55688/api/Productos/GetProductos',{}).subscribe(data => {
      this.productos = data;
      console.log(JSON.stringify(data));
    })
  }

  productoSeleccionado(codigo){
    this.modalCtrl.dismiss({codigo:codigo});
  }

  filtrando(tipo){
    if(tipo === 0){
      this.fDescripcion= '';
    }else{
      this.fCodigo='';
    }

    console.log(tipo)
  }
}
