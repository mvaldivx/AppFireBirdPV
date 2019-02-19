import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpMaquinaPage } from './ip-maquina.page';

describe('IpMaquinaPage', () => {
  let component: IpMaquinaPage;
  let fixture: ComponentFixture<IpMaquinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpMaquinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpMaquinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
