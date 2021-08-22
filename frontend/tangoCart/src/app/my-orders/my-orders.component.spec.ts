import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyOrdersComponent } from './my-orders.component';
import { OrderService } from '../servicios/order.service';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrdersComponent ],
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
