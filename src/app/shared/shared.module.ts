import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingListComponent } from './components/loading-list/loading-list.component';
import { NoutFoundComponent } from './components/nout-found/nout-found.component';
import { PrimeComponentsModule } from './prime-components/prime-components.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    LoadingListComponent
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    AppRoutingModule,
    RouterModule
  ],
  exports: [
    LoadingListComponent
  ]
})
export class SharedModule { }
