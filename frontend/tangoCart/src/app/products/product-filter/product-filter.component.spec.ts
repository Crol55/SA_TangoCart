import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { HttpClientTestingModule } from '@angular/common/http/testing';
=======
import { CategoriaService } from 'src/app/servicios/categoria.service';

>>>>>>> feature/testing
import { ProductFilterComponent } from './product-filter.component';
import { CategoriaService } from 'src/app/servicios/categoria.service';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterComponent ],
<<<<<<< HEAD
      imports: [ HttpClientTestingModule],
      providers: [CategoriaService]
=======
      imports:[HttpClientTestingModule],
      providers:[ CategoriaService]
>>>>>>> feature/testing
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
