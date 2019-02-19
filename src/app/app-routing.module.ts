import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  { path: 'modificar-inventario', loadChildren: './modificar-inventario/modificar-inventario.module#ModificarInventarioPageModule' },
  { path: 'lista-productos', loadChildren: './lista-productos/lista-productos.module#ListaProductosPageModule' },
  { path: 'ip-maquina', loadChildren: './ip-maquina/ip-maquina.module#IpMaquinaPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
