import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarInventarioPage } from './modificar-inventario.page';

describe('ModificarInventarioPage', () => {
  let component: ModificarInventarioPage;
  let fixture: ComponentFixture<ModificarInventarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarInventarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
