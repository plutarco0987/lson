import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLibrosMuchosComponent } from './agregar-libros-muchos.component';

describe('AgregarLibrosMuchosComponent', () => {
  let component: AgregarLibrosMuchosComponent;
  let fixture: ComponentFixture<AgregarLibrosMuchosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLibrosMuchosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLibrosMuchosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
