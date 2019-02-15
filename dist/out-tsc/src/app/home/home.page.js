var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { MenuController, NavController } from '@ionic/angular';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { ModificarInventarioPage } from '../modificar-inventario/modificar-inventario.page';
var HomePage = /** @class */ (function () {
    function HomePage(http, storage, menu, router, navCtrl) {
        this.http = http;
        this.storage = storage;
        this.menu = menu;
        this.router = router;
        this.navCtrl = navCtrl;
        this.ValidaUsuario();
        this.getData();
    }
    HomePage.prototype.ValidaUsuario = function () {
        var _this = this;
        this.storage.get('usuario').then(function (data) {
            if (isNull(data)) {
                _this.router.navigateByUrl('login');
            }
        });
    };
    HomePage.prototype.getData = function () {
        var _this = this;
        this.http.get('http://localhost:55688/api/Productos/GetProductos', {}).subscribe(function (data) {
            _this.productos = data;
            console.log(JSON.stringify(data));
        });
    };
    HomePage.prototype.goPage = function () {
        this.navCtrl.navigateForward(ModificarInventarioPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            Storage,
            MenuController,
            Router,
            NavController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map