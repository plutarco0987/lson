import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorClienteComponent } from './navegador-cliente.component';

describe('NavegadorClienteComponent', () => {
  let component: NavegadorClienteComponent;
  let fixture: ComponentFixture<NavegadorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegadorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegadorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
