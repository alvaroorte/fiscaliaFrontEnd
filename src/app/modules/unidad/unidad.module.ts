import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    PrimeComponentsModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    ModalFormComponent,
    PrimeComponentsModule
  ]
})
export class UnidadModule { }
