import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { TableComponent } from './components/table/table.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    PrimeComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    PrimeComponentsModule,
    TableComponent,
    ModalFormComponent
  ]
})
export class UsuarioModule { }
