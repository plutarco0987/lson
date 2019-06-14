import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteBibliotecasComponent } from './cliente-bibliotecas.component';

describe('ClienteBibliotecasComponent', () => {
  let component: ClienteBibliotecasComponent;
  let fixture: ComponentFixture<ClienteBibliotecasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteBibliotecasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteBibliotecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
