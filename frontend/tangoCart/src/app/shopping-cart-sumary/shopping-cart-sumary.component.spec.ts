import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSumaryComponent } from './shopping-cart-sumary.component';

describe('ShoppingCartSumaryComponent', () => {
  let component: ShoppingCartSumaryComponent;
  let fixture: ComponentFixture<ShoppingCartSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartSumaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
