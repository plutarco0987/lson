import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesBibliotecasInformationComponent } from './clientes-bibliotecas-information.component';

describe('ClientesBibliotecasInformationComponent', () => {
  let component: ClientesBibliotecasInformationComponent;
  let fixture: ComponentFixture<ClientesBibliotecasInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesBibliotecasInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesBibliotecasInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
