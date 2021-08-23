import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { HttpClientTestingModule } from '@angular/common/http/testing';
=======
import { ShoppingCardService } from '../servicios/shopping-card.service';
>>>>>>> feature/testing

import { BsNavbarComponent } from './bs-navbar.component';
import { ShoppingCardService } from '../servicios/shopping-card.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent ],
<<<<<<< HEAD
      imports: [HttpClientTestingModule,RouterTestingModule],
=======
      imports:[ HttpClientTestingModule],
>>>>>>> feature/testing
      providers: [ShoppingCardService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
