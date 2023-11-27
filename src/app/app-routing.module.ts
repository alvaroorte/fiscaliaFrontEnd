import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '@person/persona.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  {
    path: 'people',
    loadComponent: () => import('./modules/persona/persona.component').then(m => m.PersonaComponent)
    // loadChildren:  () => import('./modules/persona/persona.module').then(m => m.PersonaModule),
    
  },
  {
    path: 'parameters',
    loadChildren:  () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule),
    // loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => import('./shared/components/nout-found/nout-found.component').then(c => c.NoutFoundComponent)
  }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }