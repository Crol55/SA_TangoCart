import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../servicios/auth.service';

import { LoginComponent } from './login.component';

describe('Componente Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia de Crear el componente login', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia crear un formulario con 3 controles', () =>{
      expect(component.form.contains('correo')).toBeTruthy();
      expect(component.form.contains('password')).toBeTruthy();
      expect(component.form.contains('tipo')).toBeTruthy();
  });
  
  it('Debe hacer que el control de correo  sea obligatorio', () =>{
      let control = component.form.get('correo');
      control?.setValue('')
      expect(control?.valid).toBeFalsy();
  });


  


});
