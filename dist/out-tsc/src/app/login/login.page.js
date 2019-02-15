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
import { Storage } from '@ionic/storage';
import { isNull } from 'util';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(storage, router) {
        this.storage = storage;
        this.router = router;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.validaUsuario();
    };
    LoginPage.prototype.validaUsuario = function () {
        var _this = this;
        this.storage.get('usuario').then(function (data) {
            if (isNull(data) === false) {
                _this.router.navigateByUrl('home');
            }
        });
    };
    LoginPage.prototype.IniciarSesion = function () {
        this.storage.set('usuario', { usuario: 'a' });
        this.router.navigateByUrl('home');
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [Storage,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map