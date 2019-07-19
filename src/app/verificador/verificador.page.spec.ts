import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificadorPage } from './verificador.page';

describe('VerificadorPage', () => {
  let component: VerificadorPage;
  let fixture: ComponentFixture<VerificadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
