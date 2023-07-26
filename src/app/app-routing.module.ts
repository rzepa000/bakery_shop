import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { HeroComponent } from './pages/hero/hero/hero.component';
import { ContactComponent } from './pages/contact/contact/contact.component';
import { AboutComponent } from './pages/about/about/about.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent

},
{
  path: 'cart',
  component: CartComponent

},
{
  path: 'hero',
  component: HeroComponent

},
{
  path: 'about',
  component: AboutComponent

},
{
  path: 'contact',
  component: ContactComponent

},
{
  path: '', redirectTo: 'hero' , pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
