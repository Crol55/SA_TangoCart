import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminProductsComponent } from './admin-products.component';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,  MatPaginatorModule],
      declarations: [ AdminProductsComponent ],
      providers: [ProductoService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
