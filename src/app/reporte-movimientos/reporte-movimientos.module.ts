import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReporteMovimientosPage } from './reporte-movimientos.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteMovimientosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReporteMovimientosPage]
})
export class ReporteMovimientosPageModule {}
