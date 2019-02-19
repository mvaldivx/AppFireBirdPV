import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

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
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.productos = this.navParams.get('otherParameter')
    this.productosShow = this.navParams.get('otherParameter')
  }

  closeModal(){
    this.modalCtrl.dismiss({codigo:''});
  }


  productoSeleccionado(p){
    this.modalCtrl.dismiss({codigo:p.codigo,Descripcion:p.Descripcion, Existencia: p.Existencia, Costo: p.Costo});
  }

  filtrando(tipo){

    if((this.fCodigo.length > 0 && tipo === 0 )|| (this.fDescripcion.length > 0 && tipo === 1)){
      if(tipo === 0){
        this.fDescripcion= '';
      }else{
        this.fCodigo='';
      }

      this.productosShow =[];
      var cadena='';
        if(tipo === 0){
          cadena = this.fCodigo;
        }else{
          cadena = this.fDescripcion;
        }

      this.productos.forEach(element => {
        if(tipo === 0){
          if(element.codigo.length >= cadena.length){
            if(element.codigo.substring(0,cadena.length).toUpperCase() == cadena.toUpperCase()){
              this.productosShow.push(element)
            }
          }
        }else{
          if(element.Descripcion.length >= cadena.length){
            if(element.Descripcion.substring(0,cadena.length).toUpperCase() == cadena.toUpperCase()){
              this.productosShow.push(element)
            }
          }
        }
      });
    }else{
      this.productosShow = this.productos;
    }
    
  }
}
