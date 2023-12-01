import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from '@person/persona.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  {
    path: 'people',
    loadComponent: () => import('./modules/persona/persona.component').then(c => c.PersonaComponent)
    
  },
  {
    path: 'users',
    loadComponent: () => import('./modules/usuario/usuario.component').then(c => c.UsuarioComponent)
    
  },
  {
    path: 'cargo',
    loadComponent: () => import('./modules/cargo/cargo.component').then(c => c.CargoComponent)
    
  },
  {
    path: 'unidades',
    loadComponent: () => import('./modules/unidad/unidad.component').then(c => c.UnidadComponent)
    
  },
  {
    path: 'funcionarios',
    loadComponent: () => import('./modules/funcionario/funcionario.component').then(c => c.FuncionarioComponent)
    
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