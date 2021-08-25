import { routes } from './app-routing.module';
import { AuthGuardService } from './Guard/guard';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

describe('Routes', () => {
    it('Debe contener la ruta /login', ()=>{
         expect(routes).toContain({ path: 'login', component: LoginComponent })
    })

    it('Debe contener la ruta /registro', ()=>{
        expect(routes).toContain({ path: 'register', component: RegisterComponent })
   })

   
   it('Debe contener la ruta /products', ()=>{
    expect(routes).toContain( { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },)
})
})