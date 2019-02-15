import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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
      var prod ;
      prod = data;
      console.log(prod);
      prod.forEach(element => {
        this.productos.push({id:element.id, 
                            codigo: element.codigo, 
                            Descripcion: element.Descripcion, 
                            Existencia: element.Existencia, 
                            Costo: element.Costo, 
                            Visible: true})
      });
      this.productosShow = this.productos;
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
    if(this.fCodigo.length > 0 || this.fDescripcion.length > 0){
      this.productos.forEach(element => {
        var cadena='';
        if(tipo === 0){
          cadena = this.fCodigo;
        }else{
          cadena = this.fDescripcion;
        }
        if(element.codigo.length >= cadena.length){
          if(element.codigo.substring(0,cadena.length) == cadena){
            element.Visible = true;
          }else{
            element.Visible = false;
          }
        }
      });
    }
    
  }
}
