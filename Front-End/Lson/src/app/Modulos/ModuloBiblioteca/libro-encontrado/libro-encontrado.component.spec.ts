import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroEncontradoComponent } from './libro-encontrado.component';

describe('LibroEncontradoComponent', () => {
  let component: LibroEncontradoComponent;
  let fixture: ComponentFixture<LibroEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibroEncontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
