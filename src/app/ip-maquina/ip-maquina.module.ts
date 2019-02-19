import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IpMaquinaPage } from './ip-maquina.page';

const routes: Routes = [
  {
    path: '',
    component: IpMaquinaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IpMaquinaPage]
})
export class IpMaquinaPageModule {}
