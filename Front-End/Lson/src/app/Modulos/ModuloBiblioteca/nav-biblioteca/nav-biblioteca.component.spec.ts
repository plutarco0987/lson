import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBibliotecaComponent } from './nav-biblioteca.component';

describe('NavBibliotecaComponent', () => {
  let component: NavBibliotecaComponent;
  let fixture: ComponentFixture<NavBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
