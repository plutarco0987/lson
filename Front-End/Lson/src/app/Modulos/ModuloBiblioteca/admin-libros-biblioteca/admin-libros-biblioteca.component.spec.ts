import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibrosBibliotecaComponent } from './admin-libros-biblioteca.component';

describe('AdminLibrosBibliotecaComponent', () => {
  let component: AdminLibrosBibliotecaComponent;
  let fixture: ComponentFixture<AdminLibrosBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLibrosBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLibrosBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
