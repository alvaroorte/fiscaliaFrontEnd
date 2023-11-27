import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeComponentsModule } from '@shared/prime-components/prime-components.module';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { TableComponent } from './components/table/table.component';
import { ModaldeleteComponent } from '@shared/components/modal-delete/modal-delete.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalFormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    ToolbarComponent,
    ModaldeleteComponent,
    ReactiveFormsModule
  ],
  exports: [
    PrimeComponentsModule,
    ModalFormComponent,
    TableComponent
  ]
})
export class PersonaModule { }
