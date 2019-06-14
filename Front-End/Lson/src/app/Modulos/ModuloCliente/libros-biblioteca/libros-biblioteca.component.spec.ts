import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosBibliotecaComponent } from './libros-biblioteca.component';

describe('LibrosBibliotecaComponent', () => {
  let component: LibrosBibliotecaComponent;
  let fixture: ComponentFixture<LibrosBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
