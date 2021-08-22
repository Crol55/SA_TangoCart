import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShoppingCartSumaryComponent } from './shopping-cart-sumary.component';
import { ShoppingCardService } from '../servicios/shopping-card.service';

describe('ShoppingCartSumaryComponent', () => {
  let component: ShoppingCartSumaryComponent;
  let fixture: ComponentFixture<ShoppingCartSumaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartSumaryComponent ],
      imports: [ HttpClientTestingModule],
      providers: [ShoppingCardService]
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
