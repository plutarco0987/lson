import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBibliotecaComponent } from './home-biblioteca.component';

describe('HomeBibliotecaComponent', () => {
  let component: HomeBibliotecaComponent;
  let fixture: ComponentFixture<HomeBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
