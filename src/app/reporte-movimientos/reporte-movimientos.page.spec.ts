import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMovimientosPage } from './reporte-movimientos.page';

describe('ReporteMovimientosPage', () => {
  let component: ReporteMovimientosPage;
  let fixture: ComponentFixture<ReporteMovimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMovimientosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMovimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
